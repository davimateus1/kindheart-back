import prisma from '@/database/client'
import { RoleType } from '@/types'

// TODO: Ver se é realmente necessário o user_role
async function getUserProfile(user_id: string, user_role: RoleType) {
  const userId = Number(user_id)

  const friendsCount = await prisma.friendship.count({
    where: {
      OR: [
        { user_one_id: userId, status: 'ACCEPTED' },
        { user_two_id: userId, status: 'ACCEPTED' },
      ],
    },
  })

  const postsCount = await prisma.activity.count({
    where: { user_elderly_id: userId },
  })

  const reviewsCount = await prisma.review.count({
    where: { userId },
  })

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    posts_count: postsCount,
    friends_count: friendsCount,
    reviews_count: reviewsCount,
  }
}

export { getUserProfile }
