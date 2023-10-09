import {
  createChatController,
  getUserChatController,
  getUserChatsController,
} from '@/controllers'

import { FastifyInstance } from 'fastify'

async function chatRoutes(app: FastifyInstance) {
  app.post('/', createChatController)
  app.get('/:user_id', getUserChatsController)
  app.get('/:user_sender_id/:chat_id/:activity_id', getUserChatController)
}

export { chatRoutes }
