import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from '@/routes'
import { cloudinaryConfig } from '@/lib'

const app = fastify()

app.register(cors, { origin: '*' })
routes(app)

cloudinaryConfig()

export default app
