import prisma from '@/database/client'

async function elderlyAcceptVoluntary(
  activity_id: string,
  elderly_id: string,
  voluntary_id: string,
  chat_id: string,
  action: 'STARTED' | 'CANCELED' | 'FINISHED',
) {
  const activityId = Number(activity_id)
  const elderlyId = Number(elderly_id)
  const voluntaryId = Number(voluntary_id)
  const chatId = Number(chat_id)

  const activityExists = await prisma.activity.findFirst({
    where: { id: activityId },
  })

  const elderlyExists = await prisma.user.findFirst({
    where: { id: elderlyId },
  })

  const voluntaryExists = await prisma.user.findFirst({
    where: { id: voluntaryId },
  })

  if (!activityExists) {
    throw new Error('Activity not found.')
  }

  if (!elderlyExists) {
    throw new Error('Elderly not found.')
  }

  if (!voluntaryExists) {
    throw new Error('Voluntary not found.')
  }

  const elderlyAcceptedVoluntary = await prisma.activity.update({
    where: { id: activityId },
    data: {
      status: action === 'CANCELED' ? 'FREE' : action,
      user_voluntary_id: action === 'CANCELED' ? null : voluntaryId,
    },
  })

  if (action === 'CANCELED' || action === 'FINISHED') {
    await prisma.chat.update({
      where: { id: chatId },
      data: { status: 'INACTIVE', success: action === 'FINISHED' },
    })
  }

  return elderlyAcceptedVoluntary
}

export { elderlyAcceptVoluntary }
