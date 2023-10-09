import { createChatController, getUserChatsController } from '@/controllers'

import { FastifyInstance } from 'fastify'

async function chatRoutes(app: FastifyInstance) {
  app.post('/', createChatController)
  app.get('/:user_id', getUserChatsController)
}

export { chatRoutes }
