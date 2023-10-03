import { getUserFeed } from '@/useCases'
import { getUserFeedValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function getUserFeedController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id, take } = getUserFeedValidator.parse(request.params)
    const feed = await getUserFeed(user_id, take)

    return reply.status(200).send(feed)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { getUserFeedController }
