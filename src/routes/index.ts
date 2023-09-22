import { FastifyInstance } from 'fastify'
import { authRoutes } from './authRoutes'
import { userRoutes } from './userRoutes'

async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/users' })
}

export { routes }
