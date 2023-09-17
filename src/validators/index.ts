import { z } from 'zod'

export const registerUserValidator = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  cpf: z.string().min(11).max(14),
  birth_date: z.string(),
  email: z.string().email(),
  gender: z.enum(['MALE', 'FEMALE', 'NOT_INFORM']),
  password: z.string().min(6).max(255),
  role: z.enum(['ADMIN', 'VOLUNTARY', 'ELDERLY']),
  address: z.string().min(2).max(255),
  photo: z.string(),
  personal_phone: z.string().min(11).max(14),
  relative_phone: z.string().min(11).max(14),
})

export const confirmCodeValidator = z.object({
  user_code: z.string().min(6).max(6),
})

export const userLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
})

export const sendCodeValidator = z.object({
  user_code: z.string().min(6).max(6),
  first_name: z.string().min(2).max(255),
  personal_phone: z.string().min(11).max(14),
})
