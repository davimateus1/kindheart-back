import { twilioClient } from '@/lib'

interface SendCodeData {
  user_code: string
  first_name: string
  personal_phone: string
}

async function sendCode({
  user_code,
  first_name,
  personal_phone,
}: SendCodeData) {
  return await twilioClient.messages.create({
    from: `+${process.env.TWILIO_PHONE_NUMBER}`,
    to: `+55${personal_phone}`,
    body: `Olá, ${first_name}! Seja bem-vindo(a) ao KindHeart. Seu código de verificação é ${user_code}.`,
  })
}

export { sendCode }
