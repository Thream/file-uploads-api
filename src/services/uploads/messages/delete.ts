import type { FastifyPluginAsync, FastifySchema } from 'fastify'
import { Type } from '@sinclair/typebox'

import { fastifyErrors } from '../../../models/utils.js'
import verifyAPIKey from '../../../tools/plugins/verifyAPIKey.js'
import type { DeleteParameters } from '../../../tools/utils/deleteUploadedFile.js'
import {
  deleteParameters,
  deleteUploadedFile
} from '../../../tools/utils/deleteUploadedFile.js'

export const deleteServiceSchema: FastifySchema = {
  tags: ['messages'] as string[],
  security: [
    {
      apiKeyAuth: []
    }
  ] as Array<{ [key: string]: [] }>,
  params: deleteParameters,
  response: {
    200: Type.String(),
    400: fastifyErrors[400],
    404: fastifyErrors[404],
    500: fastifyErrors[500]
  }
} as const

export const deleteMessagesUploadsService: FastifyPluginAsync = async (
  fastify
) => {
  await fastify.register(verifyAPIKey)

  await fastify.route<{
    Params: DeleteParameters
  }>({
    method: 'DELETE',
    url: '/uploads/messages/:file',
    schema: deleteServiceSchema,
    handler: async (request, reply) => {
      return await deleteUploadedFile({
        fastify,
        request,
        reply,
        folder: 'messages'
      })
    }
  })
}
