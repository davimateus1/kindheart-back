import { FastifyInstance } from 'fastify'
import { authRoutes } from './authRoutes'
import { userRoutes } from './userRoutes'
import { feedRoutes } from './feedRoutes'
import { chatRoutes } from './chatRoutes'

async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/users' })
  app.register(feedRoutes, { prefix: '/feed' })
  app.register(chatRoutes, { prefix: '/chats' })
}

export { routes }
