import { FastifyReply, FastifyRequest } from 'fastify'

import { registerUser } from '@/useCases'
import { registerUserValidator } from '@/validators'

import { Twilio } from 'twilio'

async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userData = registerUserValidator.parse(request.body)
    const user = await registerUser(userData)

    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )

    try {
      await client.messages.create({
        from: `+${process.env.TWILIO_PHONE_NUMBER}`,
        to: `+55${user.personal_phone}`,
        body: `Olá, ${user.first_name}! Seja bem-vindo(a) ao KindHeart. Seu código de verificação é ${user.user_code}.`,
      })

      return reply.status(201).send(user)
    } catch {
      return reply
        .status(500)
        .send({ message: 'Not able to send SMS to the provided number.' })
    }
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { registerUserController }
