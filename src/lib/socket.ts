import { Server } from 'socket.io'
import http from 'http'

export const SocketSingleton: {
  client: Server | null
  connect: (server: http.Server) => Server
} = {
  client: null,
  connect: function (server) {
    const io = new Server(server, {
      cors: { origin: '*' },
    })

    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`)
    })

    this.client = io

    return this.client
  },
}
