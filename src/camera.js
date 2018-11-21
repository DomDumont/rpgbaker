/** Camera Class  */
export class Camera {
  constructor (myParent) {
    this.myParent = myParent
    this.gaoToFollow = undefined
    this.borderX = 200
    this.borderY = 100
  }
  Follow (gameObject) {
    this.gaoToFollow = gameObject
    this.Update(0) // To avoid glitches, bad
  }

  Update (delta) {
    if (this.gaoToFollow) {
      this.myParent.app.stage.position.x =
        -this.gaoToFollow.x + this.myParent.app.renderer.width / 2

      this.myParent.app.stage.position.y =
        -this.gaoToFollow.y + this.myParent.app.renderer.height / 2
    } else {
      this.myParent.app.stage.position.x = 0
      this.myParent.app.stage.position.y = 0
    }
  }
}
