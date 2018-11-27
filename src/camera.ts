import { GameObject } from './gameobject'
import { Game } from '.'

/** Camera Class  */
export class Camera {
  game: Game
  gaoToFollow: GameObject
  borderX: number
  borderY: number

  constructor (myParent: any) {
    this.game = myParent
    this.gaoToFollow = null
    this.borderX = 200
    this.borderY = 100
  }

  /**
   *  Tells the Camera to follow a specific GameObject
   * @param gameObject  the GameObject to follow
   */
  Follow (gameObject: any) {
    this.gaoToFollow = gameObject
    this.Update(0) // To avoid glitches, bad
  }

  /**
   * Update the position of the camera if any object must be followed
   * @param delta
   */
  Update (delta: any) {
    if (this.gaoToFollow) {
      this.game.app.stage.position.x =
        -this.gaoToFollow.x + this.game.app.renderer.width / 2

      this.game.app.stage.position.y =
        -this.gaoToFollow.y + this.game.app.renderer.height / 2
    } else {
      this.game.app.stage.position.x = 0
      this.game.app.stage.position.y = 0
    }
  }
}
