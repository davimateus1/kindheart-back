import { createFeedPostController, getUserFeedController } from '@/controllers'
import { FastifyInstance } from 'fastify'

async function feedRoutes(app: FastifyInstance) {
  app.post('/post', createFeedPostController)
  app.get('/:user_id/:take', getUserFeedController)
  app.patch('/like/:post_id/:user_id', createFeedPostController)
}

export { feedRoutes }
