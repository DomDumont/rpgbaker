const PIXI = require('pixi.js')
/** This is a description of the Room
 *
 */
export class Room extends PIXI.Container {
  constructor () {
    super()
    this.gaos = []
    this.game = undefined
  }
  /** This is a description of the Init function. */
  Init () {
    this.gaos.forEach(element => {
      element.Init()
    })
  }

  /** This is a description of the Update function. */
  Update (delta) {
    this.gaos.forEach(element => {
      element.Update(delta)
    })
    // console.log(this.game.app.ticker.FPS)
  }

  AddGAO (tilelayer, newObject) {
    this.gaos.push(newObject)
    tilelayer.addChild(newObject)
  }

  Destroy () {
    this.gaos.forEach(element => {
      element.Destroy()
    })
    this.removeChildren()
    this.gaos = []
  }
}
