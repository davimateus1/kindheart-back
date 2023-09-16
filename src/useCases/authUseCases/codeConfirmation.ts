import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function confirmUserCode(userCode: string) {
  const user = await prisma.user.findFirst({
    where: { user_code: userCode },
  })

  if (!user) {
    throw new Error('Invalid user code.')
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, user_code: 'expired' },
  })

  return user
}

export { confirmUserCode }
