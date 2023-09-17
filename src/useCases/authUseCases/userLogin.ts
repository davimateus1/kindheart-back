import prisma from '@/database/client'
import { sendCode } from './sendCode'

import bcrypt from 'bcrypt'

interface UserLoginData {
  email: string
  password: string
}

async function userLogin({ email, password }: UserLoginData) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('This email is not registered')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid credentials')
  }

  if (!user.verified) {
    await sendCode({
      user_code: user.user_code,
      first_name: user.first_name,
      personal_phone: user.personal_phone,
    })

    return { verified: user.verified }
  }

  return user
}

export { userLogin }
