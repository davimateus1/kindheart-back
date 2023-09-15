import app from './app'
import './database'

app.get('/', (_, reply) => {
  reply.send('Hello World')
})

app.listen({ port: 5000 }, () => {
  console.log('🚀 Server running at port 5000')
})
