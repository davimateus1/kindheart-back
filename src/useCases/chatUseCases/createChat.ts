import prisma from '@/database/client'

async function createChat(
  user_one_id: string,
  user_two_id: string,
  activity_id: string,
) {
  const userOneId = Number(user_one_id)
  const userTwoId = Number(user_two_id)
  const activityId = Number(activity_id)

  const chatAlreadyExists = await prisma.chat.findFirst({
    where: {
      user_sender_id: userOneId,
      user_receiver_id: userTwoId,
      activity_id: activityId,
    },
  })

  if (chatAlreadyExists) {
    throw new Error('Chat already exists.')
  }

  const createdChat = await prisma.chat.create({
    data: {
      user_sender_id: userOneId,
      user_receiver_id: userTwoId,
      activity_id: activityId,
      success: false,
    },
  })

  return createdChat
}

export { createChat }
