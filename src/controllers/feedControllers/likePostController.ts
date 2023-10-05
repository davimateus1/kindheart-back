import { likePost } from '@/useCases/feedUseCases/likePost'
import { likePostValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function likePostController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_id, post_id } = likePostValidator.parse(request.body)
    const like = await likePost(post_id, user_id)

    return reply
      .status(200)
      .send({ message: `Post ${like ? 'liked' : 'unliked'}.` })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { likePostController }
