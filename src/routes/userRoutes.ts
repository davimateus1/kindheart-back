import {
  friendController,
  getAllUsersController,
  getUserProfileController,
} from '@/controllers'
import { FastifyInstance } from 'fastify'

async function userRoutes(app: FastifyInstance) {
  app.get('/:user_id/:user_role', getUserProfileController)
  app.get('/all/:user_id/:take/:search', getAllUsersController)
  app.post('/friendship-action', friendController)
}

export { userRoutes }
