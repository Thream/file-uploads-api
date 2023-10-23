import type { FastifyPluginAsync } from "fastify"

import { deleteGuildsUploadsService } from "#src/services/uploads/guilds/delete.js"
import { getGuildsUploadsService } from "#src/services/uploads/guilds/get.js"
import { postGuildsUploadsIconService } from "#src/services/uploads/guilds/post.js"
import { deleteMessagesUploadsService } from "#src/services/uploads/messages/delete.js"
import { getMessagesUploadsService } from "#src/services/uploads/messages/get.js"
import { postMessagesUploadsService } from "#src/services/uploads/messages/post.js"
import { deleteUsersUploadsService } from "#src/services/uploads/users/delete.js"
import { getUsersUploadsService } from "#src/services/uploads/users/get.js"
import { postUsersUploadsLogoService } from "#src/services/uploads/users/post.js"

export const uploadsService: FastifyPluginAsync = async (fastify) => {
  await fastify.register(deleteGuildsUploadsService)
  await fastify.register(getGuildsUploadsService)
  await fastify.register(postGuildsUploadsIconService)

  await fastify.register(deleteMessagesUploadsService)
  await fastify.register(getMessagesUploadsService)
  await fastify.register(postMessagesUploadsService)

  await fastify.register(deleteUsersUploadsService)
  await fastify.register(getUsersUploadsService)
  await fastify.register(postUsersUploadsLogoService)
}
