export default class Player {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
  }

  update(dt) {
    console.log(dt)
  }

  move(direction) {
    if (direction.left) {
      this.x -= 10
    }
    if (direction.right) {
      this.x += 10
    }
    if (direction.top) {
      this.y -= 10
    }
    if (direction.down) {
      this.y += 10
    }
  }

  serialize() {
    return {
      id: this.id,
      x: this.x,
      y: this.y
    }
  }
}