import prisma from '@/database/client'

async function likePost(post_id: string, user_id: string) {
  const postId = Number(post_id)
  const userId = Number(user_id)

  const post = await prisma.activity.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  const likedByUserIndex = post.likedBy.indexOf(userId)

  if (likedByUserIndex !== -1) {
    post.likedBy.splice(likedByUserIndex, 1)

    await prisma.activity.update({
      where: {
        id: postId,
      },
      data: {
        likedBy: post.likedBy,
        likes: { decrement: 1 },
      },
    })

    return false
  }

  post.likedBy.push(userId)

  await prisma.activity.update({
    where: {
      id: postId,
    },
    data: {
      likedBy: post.likedBy,
      likes: { increment: 1 },
    },
  })

  return true
}

export { likePost }
