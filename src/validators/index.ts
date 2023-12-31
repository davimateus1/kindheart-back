import { z } from 'zod'

export const registerUserValidator = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  cpf: z.string().min(11).max(14),
  birth_date: z.string(),
  email: z.string().email(),
  gender: z.enum(['MALE', 'FEMALE', 'NOT_INFORM']),
  password: z.string().min(6).max(255),
  address: z.string().min(2).max(255),
  photo: z.string(),
  personal_phone: z.string().min(11).max(15),
  relative_phone: z.string().min(11).max(15),
})

export const confirmCodeValidator = z.object({
  user_code: z.string().min(6).max(6),
})

export const userLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
})

export const sendCodeValidator = z.object({
  first_name: z.string().min(2).max(255),
  personal_phone: z.string().min(11).max(14),
})

export const getUserProfileValidator = z.object({
  user_id: z.string(),
})

export const getUserFeedValidator = z.object({
  user_id: z.string(),
  take: z.string(),
})

export const createFeedPostValidator = z.object({
  user_id: z.string(),
  topic_id: z.string(),
  description: z.string(),
  image: z.string(),
})

export const likePostValidator = z.object({
  user_id: z.string(),
  post_id: z.string(),
})

export const createTopicValidator = z.object({
  label: z.string(),
  value: z.string(),
})

export const acceptFriendshipValidator = z.object({
  user_one_id: z.string(),
  user_two_id: z.string(),
  action: z.enum(['ADD', 'REMOVE']),
})

export const sendFriendshipValidator = z.object({
  user_one_id: z.string(),
  user_two_id: z.string(),
})

export const allUsersValidator = z.object({
  user_id: z.string(),
  take: z.string(),
  search: z.string().optional(),
})

export const createChatValidator = z.object({
  user_one_id: z.string(),
  user_two_id: z.string(),
  activity_id: z.string(),
})

export const getUserChatsValidator = z.object({
  user_id: z.string(),
})

export const getUserChatValidator = z.object({
  chat_id: z.string(),
  activity_id: z.string(),
})

export const elderlyAcceptVoluntaryValidator = z.object({
  activity_id: z.string(),
  elderly_id: z.string(),
  voluntary_id: z.string(),
  chat_id: z.string(),
  action: z.enum(['STARTED', 'CANCELED', 'FINISHED']),
})

export const createMessageValidator = z.object({
  author_id: z.string(),
  chat_id: z.string(),
  text: z.string(),
})
