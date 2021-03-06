import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import fastifyStatic from '@fastify/static'

import { services } from './services/index.js'
import { swaggerOptions } from './tools/configurations/swaggerOptions.js'
import { UPLOADS_URL } from './tools/configurations/index.js'

dotenv.config()
export const application = fastify({
  logger: process.env.NODE_ENV === 'development',
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier'],
      formats: {
        full: true
      }
    }
  }
})

await application.register(fastifyCors)
await application.register(fastifySensible)
await application.register(fastifyHelmet)
await application.register(fastifyRateLimit, {
  max: 200,
  timeWindow: '1 minute'
})
await application.register(fastifyStatic, {
  root: fileURLToPath(UPLOADS_URL),
  prefix: '/uploads/'
})
await application.register(fastifySwagger, swaggerOptions)
await application.register(services)
