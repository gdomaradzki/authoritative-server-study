export default class Player {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.speed = 2
  }

  move(direction) {
    if (direction.left) {
      this.x -= this.speed
    }
    if (direction.right) {
      this.x += this.speed
    }
    if (direction.up) {
      this.y -= this.speed
    }
    if (direction.down) {
      this.y += this.speed
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