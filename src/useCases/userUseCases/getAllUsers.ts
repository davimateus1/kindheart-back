import prisma from '@/database/client'

async function getAllUsers(user_id: string, take?: string, search?: string) {
  const userId = Number(user_id)
  const takeUsers = Number(take)

  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { user_one_id: userId, status: 'ACCEPTED' },
        { user_two_id: userId, status: 'ACCEPTED' },
      ],
    },
  })

  const friendsIds = friends.map((friend) => {
    if (friend.user_one_id === userId) {
      return friend.user_two_id
    }
    return friend.user_one_id
  })

  const isFriend = (id: number) => friendsIds.includes(id)

  const users = await prisma.user.findMany({
    where: {
      id: {
        notIn: [userId],
      },
      OR: [
        { first_name: { contains: search, mode: 'insensitive' } },
        { last_name: { contains: search, mode: 'insensitive' } },
      ],
    },
    take: takeUsers,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      photo: true,
      role: true,
    },
  })

  const usersWithFriendship = users.map((user) => ({
    ...user,
    isFriend: isFriend(user.id),
  }))

  return usersWithFriendship
}

export { getAllUsers }
