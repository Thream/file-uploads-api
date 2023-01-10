import type { FastifyPluginAsync } from 'fastify'

import { uploadsService } from './uploads/index.js'

export const services: FastifyPluginAsync = async (fastify) => {
  await fastify.register(uploadsService)
}
