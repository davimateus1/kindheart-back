import { getUserChat } from '@/useCases'
import { getUserChatValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getUserChatController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_sender_id, chat_id, activity_id } = getUserChatValidator.parse(
      request.params,
    )

    const chat = await getUserChat(user_sender_id, chat_id, activity_id)

    return reply.status(200).send(chat)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getUserChatController }
