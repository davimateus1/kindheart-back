import { FastifyInstance } from 'fastify'
import { authRoutes } from './auth-routes'

export async function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
}
