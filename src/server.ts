import app from '@/app'
import '@/database'

const serverPort = Number(process.env.SERVER_PORT)
const serverHost = process.env.SERVER_HOST

app.listen({ port: serverPort, host: serverHost }, () => {
  console.log(`🚀 Server running at port ${serverPort}`)
})
