import { getUserChats } from '@/useCases'
import { getUserChatsValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getUserChatsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id } = getUserChatsValidator.parse(request.params)

    const chats = await getUserChats(user_id)

    return reply.status(200).send(chats)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getUserChatsController }
