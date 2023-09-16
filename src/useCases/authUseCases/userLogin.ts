import prisma from '@/database/client'
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

  if (!user.verified) {
    throw new Error('User not verified')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid credentials')
  }

  return user
}

export { userLogin }
