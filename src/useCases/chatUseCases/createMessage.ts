import prisma from '@/database/client'
import { SocketSingleton } from '@/lib'

async function createMessage(author_id: string, chat_id: string, text: string) {
  const authorId = Number(author_id)
  const chatId = Number(chat_id)

  if (isNaN(authorId) || isNaN(chatId)) {
    throw new Error('Invalid author or chat id')
  }

  if (!text) {
    throw new Error('Invalid message text')
  }

  const message = await prisma.message.create({
    data: { author_id: authorId, chat_id: chatId, text },
  })

  SocketSingleton.client?.emit('new_message', {
    chat_id: chatId,
    author_id: authorId,
  })

  return message
}

export { createMessage }
