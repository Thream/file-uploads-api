import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync, FastifySchema } from 'fastify'
import fastifyMultipart from 'fastify-multipart'

import { fastifyErrors } from '../../../models/utils.js'
import { uploadFile } from '../../../tools/utils/uploadFile.js'
import {
  MAXIMUM_IMAGE_SIZE,
  SUPPORTED_IMAGE_MIMETYPE
} from '../../../tools/configurations/index.js'

const postServiceSchema: FastifySchema = {
  description: 'Uploads user logo',
  tags: ['uploads'] as string[],
  consumes: ['multipart/form-data'] as string[],
  produces: ['application/json'] as string[],
  response: {
    201: Type.String(),
    400: fastifyErrors[400],
    431: fastifyErrors[431],
    500: fastifyErrors[500]
  }
} as const

export const postUsersUploadsLogoService: FastifyPluginAsync = async (
  fastify
) => {
  await fastify.register(fastifyMultipart)

  fastify.route({
    method: 'POST',
    url: '/uploads/users',
    schema: postServiceSchema,
    handler: async (request, reply) => {
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
