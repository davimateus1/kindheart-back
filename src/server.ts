import app from '@/app'
import '@/database'

app.listen({ port: 5000 }, () => {
  console.log('🚀 Server running at port 5000')
})
