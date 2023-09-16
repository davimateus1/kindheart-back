import fastify from 'fastify'
import { routes } from './routes'

const app = fastify()
routes(app)

export default app
