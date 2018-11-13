/** Camera Class  */
export class Camera {
  constructor (parent) {
    this.parent = parent
    this.gaoToFollow = undefined
    this.borderX = 200
    this.borderY = 100
  }
  Follow (gameObject) {
    this.gaoToFollow = gameObject
    this.Update(0) // To avoid glitches, bad
  }

  Update (delta) {
    // console.log(this.parent.width)
    // console.log(this.parent.app.renderer.height)
    if (this.gaoToFollow) {
      this.parent.app.stage.position.x =
        -this.gaoToFollow.x + this.parent.app.renderer.width / 2

      this.parent.app.stage.position.y =
        -this.gaoToFollow.y + this.parent.app.renderer.height / 2
    } else {
      this.parent.app.stage.position.x = 0
      this.parent.app.stage.position.y = 0
    }
  }
}
