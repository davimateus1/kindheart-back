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

  return chats
}

export { getUserChats }
