import KoaRouter from 'koa-router'
import { general } from '../controller/index.mjs'

class Router {
  constructor() {
    this.router = new KoaRouter()
    this.configRoutes()
  }

  configRoutes() {
    this.generalRoutes()
  }

  generalRoutes() {
    this.router.get('/', general.status)
  }
}

export default new Router().router