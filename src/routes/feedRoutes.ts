import {
  createFeedPostController,
  createTopicController,
  getTopicsController,
  getUserFeedController,
  likePostController,
} from '@/controllers'
import { FastifyInstance } from 'fastify'

async function feedRoutes(app: FastifyInstance) {
  app.post('/post', createFeedPostController)
  app.get('/:user_id/:take', getUserFeedController)
  app.patch('/like/:user_id/:post_id', likePostController)

  app.post('/topic', createTopicController)
  app.get('/topics', getTopicsController)
}

export { feedRoutes }
