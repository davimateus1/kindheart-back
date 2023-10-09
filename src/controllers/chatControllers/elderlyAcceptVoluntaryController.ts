import { elderlyAcceptVoluntary } from '@/useCases'
import { elderlyAcceptVoluntaryValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function elderlyAcceptedVoluntaryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { voluntary_id, elderly_id, activity_id, chat_id, action } =
      elderlyAcceptVoluntaryValidator.parse(request.body)

    const activity = await elderlyAcceptVoluntary(
      activity_id,
      elderly_id,
      voluntary_id,
      chat_id,
      action,
    )

    return reply.status(201).send({ activity, action })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { elderlyAcceptedVoluntaryController }
