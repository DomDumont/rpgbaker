const PIXI = require('pixi.js')
/** This is a description of the Room
 * @tutorial tutorial-room
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
  /**
   * Add Game Object to the list of gameObjects for this room.
   * @param {*} tilelayer parent layer , the object will be attached to this layer
   * @param {*} newObject object to add
   */
  AddGAO (graphicParent, newObject) {
    console.log('AddGAO ' + newObject.name)
    this.gaos.push(newObject)
    if (graphicParent) {
      graphicParent.addChild(newObject)
    }
  }

  GetGAOByName (nameToGet) {
    this.gaos.forEach(element => {
      if (element.name === nameToGet) {
        return element
      }
    })
    return undefined
  }
  TransferPersistentObjectsTo (newRoom) {
    this.gaos.forEach(element => {
      if (element.persistent === true) {
        console.log('Transfert ' + element.constructor.name)
        element.myParent = newRoom
        newRoom.AddGAO(newRoom, element)
      }
    })
  }
  /**
   * Called when the room is destroyed. Try to destroy all gaos
   */
  Destroy () {
    this.gaos.forEach(element => {
      element.Destroy()
    })
    this.removeChildren()
    this.gaos = []
  }
}
