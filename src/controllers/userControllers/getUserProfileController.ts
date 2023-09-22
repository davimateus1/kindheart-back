import { getUserProfile } from '@/useCases'
import { getUserProfileValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id, user_role } = getUserProfileValidator.parse(request.params)
    const user = await getUserProfile(Number(user_id), user_role)

    return reply.status(200).send(user)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getUserProfileController }
