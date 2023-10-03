import { createFeedPost } from '@/useCases'
import { createFeedPostValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function createFeedPostController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id, topic_id, description, image } =
      createFeedPostValidator.parse(request.body)
    await createFeedPost(user_id, description, image, topic_id)

    return reply.status(201).send()
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { createFeedPostController }
