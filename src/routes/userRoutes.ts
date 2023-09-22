import { getUserProfileController } from '@/controllers'
import { FastifyInstance } from 'fastify'

async function userRoutes(app: FastifyInstance) {
  app.get('/:user_id/:user_role', getUserProfileController)
}

export { userRoutes }
