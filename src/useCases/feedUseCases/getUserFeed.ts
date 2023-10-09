import prisma from '@/database/client'

async function getUserFeed(user_id: string, take: string) {
  const userId = Number(user_id)
  const totalPosts = await prisma.activity.count()

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

  const isFriend = (id: number) => friendsIds.includes(id)

  const feed = await prisma.activity.findMany({
    take: Number(take),
    orderBy: { likes: 'desc' },
    include: {
      topic: true,
      user_elderly: {
        select: { photo: true, first_name: true, last_name: true, role: true },
      },
    },
  })

  const feedFriends = []
  const feedNotFriends = []

  for (const activity of feed) {
    const isFriendUser = isFriend(activity.user_elderly_id)
    if (isFriendUser) {
      feedFriends.push({
        ...activity,
        is_friend: true,
        total_posts: totalPosts,
      })
    } else {
      feedNotFriends.push({
        ...activity,
        isFriend: false,
        total_posts: totalPosts,
      })
    }
  }

  const feedFinal = [...feedFriends, ...feedNotFriends]

  return feedFinal
}

export { getUserFeed }
