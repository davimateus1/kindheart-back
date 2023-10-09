import { FastifyReply, FastifyRequest } from 'fastify'

import { registerUser, sendCode } from '@/useCases'
import { registerUserValidator } from '@/validators'

async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userData = registerUserValidator.parse(request.body)
    const user = await registerUser(userData)

    // await sendCode({
    //   user_code: user.user_code,
    //   first_name: user.first_name,
    //   personal_phone: user.personal_phone,
    // })

    return reply.status(201).send(user)
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { registerUserController }
