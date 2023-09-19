import { FastifyInstance } from 'fastify'

import {
  registerUserController,
  confirmUserController,
  userLoginController,
  sendCodeController,
} from '@/controllers'
import prisma from '@/database/client'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerUserController)
  app.patch('/confirm', confirmUserController)
  app.post('/login', userLoginController)
  app.post('/send-code', sendCodeController)
  // delete this route after development
  app.get('/users', async (_, reply) => {
    const users = await prisma.user.findMany()
    return reply.status(200).send(users)
  })
}
