import prisma from '@/database/client'

async function createTopic(label: string, value: string) {
  const topic = await prisma.topic.create({
    data: { label, value },
  })

  return topic
}

export { createTopic }
