import { FastifyPluginAsync } from 'fastify'

import { deleteGuildsUploadsService } from './guilds/delete.js'
import { getGuildsUploadsService } from './guilds/get.js'
import { postGuildsUploadsIconService } from './guilds/post.js'
import { deleteMessagesUploadsService } from './messages/delete.js'
import { getMessagesUploadsService } from './messages/get.js'
import { postMessagesUploadsService } from './messages/post.js'
import { deleteUsersUploadsService } from './users/delete.js'
import { getUsersUploadsService } from './users/get.js'
import { postUsersUploadsLogoService } from './users/post.js'

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
