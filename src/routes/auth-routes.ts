import { FastifyInstance } from 'fastify'
import { confirmCodeValidator, registerUserValidator } from '../validators'
import prisma from '../database/client'

import { Twilio } from 'twilio'
import { generateConfirmationCode } from '../utils'

import bcrypt from 'bcrypt'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const confirmationCode = generateConfirmationCode()

    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )

    const {
      cpf,
      role,
      email,
      photo,
      gender,
      address,
      password,
      last_name,
      first_name,
      birth_date,
      personal_phone,
      relative_phone,
    } = registerUserValidator.parse(request.body)

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        cpf,
        role,
        email,
        photo,
        gender,
        address,
        last_name,
        first_name,
        birth_date,
        personal_phone,
        relative_phone,
        password: encryptedPassword,
        user_code: confirmationCode,
      },
    })

    if (!user) {
      reply.status(400).send({ message: 'Not able to create user.' })
    }

    try {
      await client.messages
        .create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+55${personal_phone}`,
          body: `Olá, ${first_name}! Seja bem-vindo(a) ao KindHeart. Seu código de acesso é ${confirmationCode}.`,
        })
        .then((message) => console.log(message.sid))

      return reply.status(201).send(user)
    } catch {
      return reply
        .status(500)
        .send({ message: 'Not able to send SMS to the provided number.' })
    }
  })

  app.post('/confirm', async (request, reply) => {
    const { user_code } = confirmCodeValidator.parse(request.body)

    const user = await prisma.user.findFirst({
      where: { user_code },
    })

    if (!user) {
      return reply.status(404).send({ message: 'This code is invalid.' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { verified: true, user_code: 'expired' },
    })

    return reply.status(200).send({ message: 'User confirmed successfully.' })
  })
}
