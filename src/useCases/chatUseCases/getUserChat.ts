import prisma from '@/database/client'

async function getUserChat(chat_id: string, activity_id: string) {
  const chatId = Number(chat_id)
  const activityId = Number(activity_id)

  const activityExists = await prisma.activity.findFirst({
    where: { id: activityId },
  })

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
    },
    include: {
      user_sender: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          role: true,
          address: true,
          photo: true,
        },
      },
      user_receiver: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          role: true,
          address: true,
          photo: true,
        },
      },
      messages: true,
    },
  })

  if (!activityExists) {
    throw new Error('Activity not found.')
  }

  if (!chat) {
    throw new Error('Chat not found.')
  }

  return { ...chat, activity: activityExists }
}

export { getUserChat }
