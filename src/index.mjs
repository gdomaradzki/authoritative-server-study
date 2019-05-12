import Koa from 'koa'
import HTTP from 'http'
import Helmet from 'koa-helmet'
import Morgan from 'koa-morgan'
import Serve from 'koa-static'
import IO from 'socket.io'

import Router from './router'

class Server {
  constructor() {
    this.app = new Koa()
    this.server = HTTP.createServer(this.app.callback())
    this.io = IO(this.server)
    this.port = 3000 || process.env.PORT
    this.clients = {}
    this.config()
    this.setConnection()
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
    this.io.on('connection', () => console.log('yay'))
  }

  update() {}
}

export default new Server()
