import { FastifyInstance } from 'fastify'

import { registerUserController, confirmUserController } from '@/controllers'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerUserController)
  app.patch('/confirm', confirmUserController)
}
