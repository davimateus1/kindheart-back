import { sendCode } from '@/useCases'
import { sendCodeValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function sendCodeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_code, first_name, personal_phone } = sendCodeValidator.parse(
      request.body,
    )

    await sendCode({ user_code, first_name, personal_phone })

    return reply.status(201).send({ message: 'Code sent successfully.' })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { sendCodeController }
