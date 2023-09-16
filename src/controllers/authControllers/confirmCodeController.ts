import { FastifyRequest, FastifyReply } from 'fastify'
import { confirmUserCode } from '@/useCases'

interface ConfirmUserCodeData {
  user_code: string
}

async function confirmUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { user_code } = request.body as ConfirmUserCodeData
    await confirmUserCode(user_code)

    return reply
      .status(200)
      .send({ message: 'Usuário confirmado com sucesso.' })
  } catch (error) {
    return error instanceof Error
      ? reply.status(400).send({ message: error.message })
      : reply.status(500).send({ message: 'Internal server error.' })
  }
}

export { confirmUserController }
