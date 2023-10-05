import prisma from '@/database/client'

async function sendFriendshipRequest(user_one_id: string, user_two_id: string) {
  const userId = Number(user_one_id)
  const friendId = Number(user_two_id)

  const isFriend = await prisma.friendship.findFirst({
    where: {
      user_one_id: userId,
      user_two_id: friendId,
      status: 'ACCEPTED',
    },
  })

  if (isFriend) {
    throw new Error('You are already friends.')
  }

  const pendingFriendship = await prisma.friendship.findFirst({
    where: {
      user_one_id: userId,
      user_two_id: friendId,
      status: 'PENDING',
    },
  })

  if (!pendingFriendship) {
    const createFriendship = await prisma.friendship.create({
      data: {
        user_one_id: userId,
        user_two_id: friendId,
        status: 'PENDING',
      },
    })

    return createFriendship
  }

  return pendingFriendship
}

export { sendFriendshipRequest }
