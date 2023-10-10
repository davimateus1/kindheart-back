import prisma from '@/database/client'

async function getUserChats(user_id: string) {
  const userId = Number(user_id)

  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ user_sender_id: userId }, { user_receiver_id: userId }],
    },
    include: {
      user_sender: {
        select: {
          first_name: true,
          last_name: true,
          photo: true,
        },
      },
      user_receiver: {
        select: {
          first_name: true,
          last_name: true,
          photo: true,
        },
      },
      messages: true,
    },
  })

  const chatWithRelationedUserPhoto = chats.map((chat) => {
    if (chat.user_sender_id === userId) {
      return {
        ...chat,
        user_photo: chat.user_receiver.photo,
        user_name: `${chat.user_receiver.first_name} ${chat.user_receiver.last_name}`,
      }
    }

    return {
      ...chat,
      user_photo: chat.user_sender.photo,
      user_name: `${chat.user_sender.first_name} ${chat.user_sender.last_name}`,
    }
  })

  return chatWithRelationedUserPhoto
}

export { getUserChats }
