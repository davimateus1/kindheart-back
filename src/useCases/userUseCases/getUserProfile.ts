import prisma from '@/database/client'

async function getUserProfile(user_id: string) {
  const userId = Number(user_id)

  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        {
          user_one_id: userId,
        },
        {
          user_two_id: userId,
        },
      ],
    },
  })

  const friendsCount = friends.length

  const friendsIds = friends.map((friend) => {
    if (friend.user_one_id === userId) {
      return friend.user_two_id
    }

    return friend.user_one_id
  })

  const postsCount = await prisma.activity.count({
    where: { user_elderly_id: userId },
  })

  const reviewsCount = await prisma.review.count({
    where: { userId },
  })

  const totalUserChats = await prisma.chat.count({
    where: {
      OR: [
        {
          user_sender_id: userId,
        },
        {
          user_receiver_id: userId,
        },
      ],
    },
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
    friends: friendsIds,
    total_chats: totalUserChats,
  }
}

export { getUserProfile }
