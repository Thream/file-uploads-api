import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

import { Static, Type } from '@sinclair/typebox'
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyReply,
  FastifyRequest,
  FastifyTypeProviderDefault
} from 'fastify'

import { isExistingFile } from './isExistingFile.js'

export const deleteParameters = Type.Object({
  file: Type.String()
})

export type DeleteParameters = Static<typeof deleteParameters>

export interface DeleteUploadedFileOptions {
  folder: 'guilds' | 'messages' | 'users'
  fastify: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance,
    FastifyTypeProviderDefault
  >
  request: FastifyRequest<{ Params: DeleteParameters }>
  reply: FastifyReply
}

export const deleteUploadedFile = async (
  options: DeleteUploadedFileOptions
): Promise<string> => {
  const { request, fastify, reply, folder } = options
  if (request.apiKey == null) {
    throw fastify.httpErrors.forbidden()
  }
  const { file } = request.params
  const fileURL = new URL(`../../../uploads/${folder}/${file}`, import.meta.url)
  const filePath = fileURLToPath(fileURL)
  if (!(await isExistingFile(filePath))) {
    throw fastify.httpErrors.notFound('File does not exist')
  }
  await fs.promises.rm(filePath, { force: true })
  reply.statusCode = 200
  return file
}
