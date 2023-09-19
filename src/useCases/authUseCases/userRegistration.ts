import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'

import { generateConfirmationCode } from '@/utils'
import prisma from '@/database/client'
import { GenderType } from '@/types'

interface UserData {
  cpf: string
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

  const replaceDate = birth_date
    .replace(/\//g, '-')
    .split('-')
    .reverse()
    .join('-')

  const formattedPhones = {
    personalPhone: personal_phone.replace(/\D/g, ''),
    relative_phone: relative_phone.replace(/\D/g, ''),
  }

  const role =
    new Date().getFullYear() - new Date(birth_date).getFullYear() >= 60
      ? 'ELDERLY'
      : 'VOLUNTARY'

  const user = await prisma.user.create({
    data: {
      cpf,
      role,
      email,
      gender,
      address,
      last_name,
      first_name,
      photo: uploadedPhoto,
      user_code: confirmationCode,
      password: encryptedPassword,
      personal_phone: formattedPhones.personalPhone,
      relative_phone: formattedPhones.relative_phone,
      birth_date: new Date(replaceDate).toISOString(),
    },
  })

  return user
}

export { registerUser }
