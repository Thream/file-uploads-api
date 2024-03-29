import { fileURLToPath } from "node:url"

import dotenv from "dotenv"
import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import fastifyHelmet from "@fastify/helmet"
import fastifyRateLimit from "@fastify/rate-limit"
import fastifySensible from "@fastify/sensible"
import fastifyStatic from "@fastify/static"
import { readPackage } from "read-pkg"

import { services } from "#src/services/index.js"
import { UPLOADS_URL } from "#src/tools/configurations.js"

dotenv.config()
const packageJSON = await readPackage()
export const application = fastify({
  logger: process.env["NODE_ENV"] === "development",
  ajv: {
    customOptions: {
      strict: "log",
      keywords: ["kind", "modifier"],
      formats: {
        full: true,
      },
    },
  },
})

await application.register(fastifyCors)
await application.register(fastifySensible)
await application.register(fastifyHelmet)
await application.register(fastifyRateLimit, {
  max: 200,
  timeWindow: "1 minute",
})
await application.register(fastifyStatic, {
  root: fileURLToPath(UPLOADS_URL),
  prefix: "/uploads/",
})
await application.register(fastifySwagger, {
  openapi: {
    info: {
      title: packageJSON.name,
      description: packageJSON.description,
      version: packageJSON.version,
    },
    tags: [{ name: "users" }, { name: "guilds" }, { name: "messages" }],
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: "apiKey",
          name: "X-API-KEY",
          in: "header",
        },
      },
    },
  },
  hideUntagged: true,
})
await application.register(fastifySwaggerUI, {
  routePrefix: "/documentation",
  staticCSP: true,
})
await application.register(services)
