import prisma from '@/database/client'

async function friendHandler(
  user_one_id: string,
  user_two_id: string,
  action: 'ADD' | 'REMOVE',
) {
  const userId = Number(user_one_id)
  const friendId = Number(user_two_id)

  const isFriend = await prisma.friendship.findFirst({
    where: {
      OR: [
        { user_one_id: userId, user_two_id: friendId },
        { user_one_id: friendId, user_two_id: userId },
      ],
    },
  })

  if (action === 'ADD') {
    if (isFriend) {
      throw new Error('Friendship already exists.')
    }

    await prisma.friendship.create({
      data: {
        user_one_id: userId,
        user_two_id: friendId,
        status: 'ACCEPTED',
      },
    })
  } else {
    if (!isFriend) {
      throw new Error('Friendship does not exists.')
    }

    await prisma.friendship.delete({
      where: {
        id: isFriend.id,
      },
    })
  }
}

export { friendHandler }
