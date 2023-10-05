import { sendFriendshipRequest } from '@/useCases'

import { sendFriendshipValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function friendshipRequestController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_one_id, user_two_id } = sendFriendshipValidator.parse(
      request.body,
    )
    await sendFriendshipRequest(user_one_id, user_two_id)

    return reply.status(201).send({ message: 'Friendship created.' })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { friendshipRequestController }
