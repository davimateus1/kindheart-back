import { createChat } from '@/useCases'
import { createChatValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function createChatController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_one_id, user_two_id, activity_id } = createChatValidator.parse(
      request.body,
    )

    await createChat(user_one_id, user_two_id, activity_id)

    return reply.status(201).send()
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { createChatController }
