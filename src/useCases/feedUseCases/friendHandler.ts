import prisma from '@/database/client'

async function friendHandler(
  user_one_id: string,
  user_two_id: string,
  action: 'ACCEPT' | 'REJECT',
) {
  const userId = Number(user_one_id)
  const friendId = Number(user_two_id)

  const pendingFriendship = await prisma.friendship.findFirst({
    where: {
      user_one_id: userId,
      user_two_id: friendId,
      status: 'PENDING',
    },
  })

  if (!pendingFriendship) {
    throw new Error('Friendship request not found.')
  }

  if (action === 'ACCEPT') {
    const acceptFriendship = await prisma.friendship.update({
      where: { id: pendingFriendship.id },
      data: { status: 'ACCEPTED' },
    })

    return acceptFriendship
  }

  if (action === 'REJECT') {
    const rejectFriendship = await prisma.friendship.delete({
      where: { id: pendingFriendship.id },
    })

    return rejectFriendship
  }
}

export { friendHandler }
