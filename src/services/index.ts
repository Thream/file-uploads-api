import type { FastifyPluginAsync } from "fastify"

import { uploadsService } from "#src/services/uploads/index.js"

export const services: FastifyPluginAsync = async (fastify) => {
  await fastify.register(uploadsService)
}
