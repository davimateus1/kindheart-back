import fastify from 'fastify'

import { routes } from '@/routes'
import { cloudinaryConfig } from '@/lib'

cloudinaryConfig()

const app = fastify()

routes(app)

export default app
