import { getUserProfile } from '@/useCases'
import { getUserProfileValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id } = getUserProfileValidator.parse(request.params)
    const user = await getUserProfile(user_id)

    return reply.status(200).send(user)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getUserProfileController }
