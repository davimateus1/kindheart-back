import {
  createFeedPostController,
  createTopicController,
  friendController,
  friendshipRequestController,
  getTopicsController,
  getUserFeedController,
  likePostController,
} from '@/controllers'

import { FastifyInstance } from 'fastify'

async function feedRoutes(app: FastifyInstance) {
  app.post('/post', createFeedPostController)
  app.get('/:user_id/:take', getUserFeedController)
  app.patch('/post/like', likePostController)

  app.post('/friendship-request', friendshipRequestController)
  app.post('/friend-action', friendController)

  app.post('/topic', createTopicController)
  app.get('/topics', getTopicsController)
}

export { feedRoutes }
