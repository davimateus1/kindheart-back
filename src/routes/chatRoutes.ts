import {
  createChatController,
  createMessageController,
  elderlyAcceptedVoluntaryController,
  getUserChatController,
  getUserChatsController,
} from '@/controllers'

import { FastifyInstance } from 'fastify'

async function chatRoutes(app: FastifyInstance) {
  app.post('/', createChatController)
  app.get('/:user_id', getUserChatsController)
  app.get('/:chat_id/:activity_id', getUserChatController)
  app.patch('/elderly-action', elderlyAcceptedVoluntaryController)
  app.post('/message', createMessageController)
}

export { chatRoutes }
