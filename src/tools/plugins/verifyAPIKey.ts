import fastifyPlugin from 'fastify-plugin'
import httpErrors from 'http-errors'

import { API_KEY } from '../configurations/index.js'

const { Unauthorized, Forbidden } = httpErrors

declare module 'fastify' {
  export interface FastifyRequest {
    apiKey?: string
  }
}

export default fastifyPlugin(
  async (fastify) => {
    await fastify.decorateRequest('apiKey', null)
    await fastify.addHook('onRequest', async (request) => {
      const apiKey = request.headers['x-api-key']
      if (apiKey == null || typeof apiKey !== 'string') {
        throw new Unauthorized()
      }
      if (apiKey !== API_KEY) {
        throw new Forbidden()
      }
      request.apiKey = apiKey
    })
  },
  { fastify: '4.x' }
)
