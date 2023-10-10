import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from '@/routes'
import { SocketSingleton, cloudinaryConfig } from '@/lib'

const app = fastify()

SocketSingleton.connect(app.server)

app.register(cors, { origin: '*' })
routes(app)

cloudinaryConfig()

export default app
