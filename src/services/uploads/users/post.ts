import { Type } from '@sinclair/typebox'
import type { FastifyPluginAsync, FastifySchema } from 'fastify'
import fastifyMultipart from '@fastify/multipart'

import { fastifyErrors } from '../../../models/utils.js'
import { uploadFile } from '../../../tools/utils/uploadFile.js'
import {
  MAXIMUM_IMAGE_SIZE,
  SUPPORTED_IMAGE_MIMETYPE
} from '../../../tools/configurations.js'
import verifyAPIKey from '../../../tools/plugins/verifyAPIKey.js'

const postServiceSchema: FastifySchema = {
  description: 'Uploads user logo',
  tags: ['users'] as string[],
  security: [
    {
      apiKeyAuth: []
    }
  ] as Array<{ [key: string]: [] }>,
  consumes: ['multipart/form-data'] as string[],
  produces: ['application/json'] as string[],
  response: {
    201: Type.String(),
    400: fastifyErrors[400],
    401: fastifyErrors[401],
    403: fastifyErrors[403],
    431: fastifyErrors[431],
    500: fastifyErrors[500]
  }
} as const

export const postUsersUploadsLogoService: FastifyPluginAsync = async (
  fastify
) => {
  await fastify.register(fastifyMultipart)
  await fastify.register(verifyAPIKey)

  fastify.route({
    method: 'POST',
    url: '/uploads/users',
    schema: postServiceSchema,
    handler: async (request, reply) => {
      if (request.apiKey == null) {
        throw fastify.httpErrors.forbidden()
      }
      const file = await uploadFile({
        fastify,
        request,
        folderInUploadsFolder: 'users',
        maximumFileSize: MAXIMUM_IMAGE_SIZE,
        supportedFileMimetype: SUPPORTED_IMAGE_MIMETYPE
      })
      reply.statusCode = 201
      return file.pathToStoreInDatabase
    }
  })
}
