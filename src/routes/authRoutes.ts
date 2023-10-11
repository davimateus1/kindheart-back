import { FastifyInstance } from 'fastify'

import {
  registerUserController,
  confirmUserController,
  userLoginController,
  sendCodeController,
} from '@/controllers'

async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerUserController)
  app.patch('/confirm', confirmUserController)
  app.post('/login', userLoginController)
  app.post('/send-code', sendCodeController)
}

export { authRoutes }
