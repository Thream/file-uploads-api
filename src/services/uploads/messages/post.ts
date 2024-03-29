import { Type } from "@sinclair/typebox"
import type { FastifyPluginAsync, FastifySchema } from "fastify"
import fastifyMultipart from "@fastify/multipart"

import { fastifyErrors } from "#src/models/utils.js"
import { uploadFile } from "#src/tools/utils/uploadFile.js"
import { MAXIMUM_IMAGE_SIZE } from "#src/tools/configurations.js"
import verifyAPIKey from "#src/tools/plugins/verifyAPIKey.js"

const postServiceSchema: FastifySchema = {
  description: "Uploads message file",
  tags: ["messages"] as string[],
  security: [
    {
      apiKeyAuth: [],
    },
  ] as Array<{ [key: string]: [] }>,
  consumes: ["multipart/form-data"] as string[],
  produces: ["application/json"] as string[],
  response: {
    201: Type.String(),
    400: fastifyErrors[400],
    401: fastifyErrors[401],
    403: fastifyErrors[403],
    431: fastifyErrors[431],
    500: fastifyErrors[500],
  },
} as const

export const postMessagesUploadsService: FastifyPluginAsync = async (
  fastify,
) => {
  await fastify.register(fastifyMultipart)
  await fastify.register(verifyAPIKey)

  fastify.route({
    method: "POST",
    url: "/uploads/messages",
    schema: postServiceSchema,
    handler: async (request, reply) => {
      if (request.apiKey == null) {
        throw fastify.httpErrors.forbidden()
      }
      const file = await uploadFile({
        fastify,
        request,
        folderInUploadsFolder: "messages",
        maximumFileSize: MAXIMUM_IMAGE_SIZE,
      })
      reply.statusCode = 201
      return file.pathToStoreInDatabase
    },
  })
}
