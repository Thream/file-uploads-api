import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync, FastifySchema } from 'fastify'
import fastifyMultipart from 'fastify-multipart'

import { fastifyErrors } from '../../../models/utils.js'
import { uploadFile } from '../../../tools/utils/uploadFile.js'
import { MAXIMUM_IMAGE_SIZE } from '../../../tools/configurations/index.js'

const postServiceSchema: FastifySchema = {
  description: 'Uploads message file',
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

export const postMessagesUploadsService: FastifyPluginAsync = async (
  fastify
) => {
  await fastify.register(fastifyMultipart)

  fastify.route({
    method: 'POST',
    url: '/uploads/messages',
    schema: postServiceSchema,
    handler: async (request, reply) => {
      const file = await uploadFile({
        fastify,
        request,
        folderInUploadsFolder: 'messages',
        maximumFileSize: MAXIMUM_IMAGE_SIZE
      })
      reply.statusCode = 201
      return file.pathToStoreInDatabase
    }
  })
}
