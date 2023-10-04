import { getTopics } from '@/useCases'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getTopicsController(_: FastifyRequest, reply: FastifyReply) {
  try {
    const topics = await getTopics()

    return reply.status(200).send(topics)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getTopicsController }
