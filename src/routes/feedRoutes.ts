import { createFeedPostController, getUserFeedController } from '@/controllers'
import { FastifyInstance } from 'fastify'

async function feedRoutes(app: FastifyInstance) {
  app.get('/', getUserFeedController)
  app.post('/post', createFeedPostController)
}

export { feedRoutes }
