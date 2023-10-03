import prisma from '@/database/client'
import { v2 as cloudinary } from 'cloudinary'

async function createFeedPost(
  user_id: string,
  description: string,
  image: string,
  topic_id: string,
) {
  const uploadedPhoto = await cloudinary.uploader
    .upload(image, { folder: 'kindheart-posts' })
    .then((result) => result.url)

  const post = await prisma.activity.create({
    data: {
      user_elderly_id: Number(user_id),
      topic_id: Number(topic_id),
      user_voluntary_id: -1,
      description,
      image: uploadedPhoto,
    },
  })

  return post
}

export { createFeedPost }
