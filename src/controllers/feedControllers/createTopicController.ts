import { createTopic } from '@/useCases'

import { createTopicValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function createTopicController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { label, value } = createTopicValidator.parse(request.body)
    await createTopic(label, value)

    return reply.status(201).send({ message: 'Topic created successfully.' })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { createTopicController }
