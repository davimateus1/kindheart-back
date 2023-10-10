import { createMessage } from '@/useCases'
import { createMessageValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function createMessageController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { author_id, chat_id, text } = createMessageValidator.parse(
      request.body,
    )

    const messageCreated = await createMessage(author_id, chat_id, text)

    return reply.status(201).send(messageCreated)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { createMessageController }
