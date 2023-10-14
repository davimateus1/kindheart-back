import app from '@/app'
import '@/database'

const serverPort = Number(process.env.SERVER_PORT)

app.listen({ port: serverPort }, () => {
  console.log(`🚀 Server running at port ${serverPort}`)
})
