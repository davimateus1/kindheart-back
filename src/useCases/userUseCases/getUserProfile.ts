import prisma from '@/database/client'
import { RoleType } from '@/types'

async function getUserProfile(user_id: number, user_role: RoleType) {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      personal_phone: true,
      birth_date: true,
      verified: true,
      created_at: true,
      updated_at: true,
      photo: true,
      role: true,
      ...(user_role === 'VOLUNTARY' && { activities_voluntary: true }),
      ...(user_role === 'ELDERLY' && { activities_elderly: true }),
      user_reviews: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const userAge = Math.floor(
    (new Date().getTime() - user.birth_date.getTime()) / 3.15576e10,
  )

  return {
    ...user,
    age: userAge,
  }
}

export { getUserProfile }
