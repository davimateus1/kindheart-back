import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'

import { generateConfirmationCode } from '@/utils'
import prisma from '@/database/client'
import { GenderType, RoleType } from '@/types'

interface UserData {
  cpf: string
  role: RoleType
  email: string
  photo: string
  gender: GenderType
  address: string
  birth_date: string
  password: string
  last_name: string
  first_name: string
  personal_phone: string
  relative_phone: string
}

async function registerUser({
  cpf,
  role,
  email,
  photo,
  gender,
  address,
  password,
  last_name,
  first_name,
  birth_date,
  personal_phone,
  relative_phone,
}: UserData) {
  const confirmationCode = generateConfirmationCode()
  const encryptedPassword = await bcrypt.hash(password, 10)

  const uploadedPhoto = await cloudinary.uploader
    .upload(photo, { folder: 'kindheart' })
    .then((result) => result.url)

  const user = await prisma.user.create({
    data: {
      cpf,
      role,
      email,
      gender,
      address,
      last_name,
      first_name,
      birth_date,
      personal_phone,
      relative_phone,
      photo: uploadedPhoto,
      password: encryptedPassword,
      user_code: confirmationCode,
    },
  })

  return user
}

export { registerUser }
