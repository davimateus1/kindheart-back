import { friendHandler } from '@/useCases'

import { acceptFriendshipValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function friendController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { user_one_id, user_two_id, action } =
      acceptFriendshipValidator.parse(request.body)
    await friendHandler(user_one_id, user_two_id, action)

    return reply.status(201).send({
      message: `${
        action === 'ACCEPT' ? 'Friendship accepted.' : 'Friendship rejected.'
      }`,
    })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { friendController }
