export default class GeneralController {
  static async status(ctx) {
    const response = {
      status: 'OK',
      code: '200',
      title: 'Authoritative Server',
      description: 'Learning how to build an Authoritative Server'
    }

    ctx.body = response
  }
}
