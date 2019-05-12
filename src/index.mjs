import Koa from 'koa'
import HTTP from 'http'
import Helmet from 'koa-helmet'
import Morgan from 'koa-morgan'
import Serve from 'koa-static'
import IO from 'socket.io'

import Router from './router'
import Player from './player'

class Server {
  constructor() {
    this.app = new Koa()
    this.server = HTTP.createServer(this.app.callback())
    this.io = IO(this.server)
    this.port = 3000 || process.env.PORT
    this.clients = {}
    this.players = {}
    this.config()
    this.TICK = 1000 / 60
    this.lastTimeUpdated = Date.now()
    this.shouldSendNewClients = false
    this.shouldSendUpdate = false
    this.setConnection()
    setInterval(this.update.bind(this), this.TICK)
  }

  config() {
    this.app.use(Helmet())
    this.app.use(Morgan('tiny'))
    this.app.use(Router.routes())
    this.start()
  }

  start() {
    this.server.listen(this.port)
    console.log(`Server running on http://localhost:${this.port}`)
  }

  setConnection() {
    this.io.on('connection', (client) => {
      console.log(`User connected with id: ${client.id}`)

      this.addPlayer(client)

      client.on('input', (direction) => {
        this.handleInput(client.id, direction)
      })

      client.on('disconnect', () => {
        console.log(`User disconnected with id: ${client.id}`)
      })
    })
  }

  update() {
    const now = Date.now()
    const dt = (now - this.lastTimeUpdated) / 1000
    this.lastTimeUpdated = now

    if (this.shouldSendUpdate) {
      Object.keys(this.clients).forEach((id) => {
        const client = this.clients[id]
        const player = this.players[id]

        this.io.emit('game-update', this.prepareUpdate(player))
      })

      this.shouldSendUpdate = false
    } else {
      this.shouldSendUpdate = true
    }
  }

  prepareUpdate(player) {
    return {
      t: Date.now(),
      player: player.serialize(),
      others: () => {
        for (let id in this.players) {
          return this.players[id].serialize
        }
      }
    }
  }

  addPlayer(client) {
    this.clients[client.id] = client
    this.players[client.id] = new Player(
      client.id,
      500,
      500
    )
  }

  removePlayer(id) {
    delete this.clients[id]
    delete this.players[id]
  }

  handleInput(id, direction) {
    this.players[id].move(direction)
  }
}

export default new Server()
