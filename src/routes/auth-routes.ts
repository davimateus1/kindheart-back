import { FastifyInstance } from 'fastify'

import {
  registerUserController,
  confirmUserController,
  userLoginController,
} from '@/controllers'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerUserController)
  app.patch('/confirm', confirmUserController)
  app.post('/login', userLoginController)
}
