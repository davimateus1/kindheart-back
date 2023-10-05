import { getAllUsers } from '@/useCases'
import { allUsersValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getAllUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id, take, search } = allUsersValidator.parse(request.params)
    const users = await getAllUsers(user_id, take, search)

    return reply.status(200).send(users)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getAllUsersController }
