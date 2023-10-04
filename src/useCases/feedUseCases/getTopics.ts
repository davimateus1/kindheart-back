import prisma from '@/database/client'

async function getTopics() {
  const topics = await prisma.topic.findMany()
  return topics
}

export { getTopics }
