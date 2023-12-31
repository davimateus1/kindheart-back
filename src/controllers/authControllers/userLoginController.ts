import { userLogin } from '@/useCases'
import { userLoginValidator } from '@/validators'

import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

async function userLoginController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = userLoginValidator.parse(request.body)
    const user = await userLogin({ email, password })

    if (!user.verified) {
      return reply.status(200).send({
        verified: user.verified,
        first_name: user.first_name,
        personal_phone: user.personal_phone,
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '30d',
    })

    return reply.status(200).send({ user, token })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error' })
  }
}

export { userLoginController }
