import { FastifyInstance } from 'fastify'
import { authRoutes } from './authRoutes'
import { userRoutes } from './userRoutes'
import { feedRoutes } from './feedRoutes'

async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/users' })
  app.register(feedRoutes, { prefix: '/feed' })
}

export { routes }
