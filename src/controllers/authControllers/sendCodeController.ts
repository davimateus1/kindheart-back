import prisma from '@/database/client'
import { sendCode } from '@/useCases'
import { generateConfirmationCode } from '@/utils'
import { sendCodeValidator } from '@/validators'
import { FastifyReply, FastifyRequest } from 'fastify'

async function sendCodeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const newCode = generateConfirmationCode()
    const { first_name, personal_phone } = sendCodeValidator.parse(request.body)

    const user = await prisma.user.findFirst({
      where: { personal_phone },
    })

    if (!user) {
      return reply.status(404).send({ message: 'User not found.' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { user_code: newCode },
    })

    await sendCode({ user_code: newCode, first_name, personal_phone })

    return reply.status(201).send({ message: 'Code sent successfully.' })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { sendCodeController }
