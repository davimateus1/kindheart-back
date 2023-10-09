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

    const createdChat = await createChat(user_one_id, user_two_id, activity_id)

    return reply.status(201).send({
      chat_id: createdChat.id,
      user_sender_id: createdChat.user_sender_id,
      activity_id: createdChat.activity_id,
    })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { createChatController }
