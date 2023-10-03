import prisma from '@/database/client'

async function getUserFeed(user_id: string, take: string) {
  const userId = Number(user_id)

  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { user_one_id: userId, status: 'ACCEPTED' },
        { user_two_id: userId, status: 'ACCEPTED' },
      ],
    },
    select: {
      user_one_id: true,
      user_two_id: true,
    },
  })

  const friendsIds = friends.map((friend) => {
    if (friend.user_one_id === userId) {
      return friend.user_two_id
    }
    return friend.user_one_id
  })

  const feed = await prisma.activity.findMany({
    where: {
      user_elderly_id: {
        in: [...friendsIds, userId],
      },
    },
    take: Number(take),
    orderBy: {
      created_at: 'desc',
    },
  })

  return feed
}

export { getUserFeed }
