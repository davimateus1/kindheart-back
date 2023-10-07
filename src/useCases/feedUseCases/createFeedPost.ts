import prisma from '@/database/client'
import { v2 as cloudinary } from 'cloudinary'

async function createFeedPost(
  user_id: string,
  description: string,
  image: string,
  topic_id: string,
) {
  const topicId = Number(topic_id)

  const user = await prisma.user.findUnique({
    where: { id: Number(user_id) },
  })

  if (!user) {
    throw new Error('User not exists.')
  }

  const uploadedPhoto = await cloudinary.uploader
    .upload(image, { folder: 'kindheart-posts' })
    .then((result) => result.url)

  const post = await prisma.activity.create({
    data: {
      user_elderly_id: user.id,
      user_voluntary_id: null,
      description,
      image: uploadedPhoto,
      topic_id: topicId,
    },
  })

  return post
}

export { createFeedPost }
