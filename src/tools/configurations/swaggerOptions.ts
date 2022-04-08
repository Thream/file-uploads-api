import dotenv from 'dotenv'
import { readPackage } from 'read-pkg'
import { FastifyDynamicSwaggerOptions } from 'fastify-swagger'

dotenv.config()

const packageJSON = await readPackage()

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  routePrefix: '/documentation',
  openapi: {
    info: {
      title: packageJSON.name,
      description: packageJSON.description,
      version: packageJSON.version
    },
    tags: [{ name: 'guilds' }, { name: 'messages' }, { name: 'users' }]
  },
  exposeRoute: true,
  staticCSP: true,
  hideUntagged: true
}
