const PIXI = require('pixi.js')
/** This is a description of the Room
 * @tutorial tutorial-room
 */
export class Room extends PIXI.Container {
  constructor (name) {
    super()
    this.gaos = []
    this.game = undefined
    this.name = name
  }
  /** This is a description of the Init function. */
  Init () {
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      if (element.persistent === false) element.Init()
    }
  }

  /** This is a description of the Update function. */
  Update (delta) {
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      element.Update(delta)
    }
  }
  /**
   * Add Game Object to the list of gameObjects for this room.
   * @param {*} tilelayer parent layer , the object will be attached to this layer
   * @param {*} newObject object to add
   */
  AddGAO (newObject) {
    console.log('AddGAO ' + newObject.name)
    this.gaos.push(newObject)
  }

  GetGAOByName (nameToGet) {
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      if (element.name === nameToGet) {
        return element
      }
    }

    return undefined
  }

  TransferPersistentObjectsTo (newRoom) {
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      if (element.persistent === true) {
        console.log('Transfert ' + element.constructor.name)
        element.myParent = newRoom
        newRoom.AddGAO(element)
        newRoom.addChild(element)
      }
    }
  }
  /**
   * Called when the room is destroyed. Try to destroy all gaos
   */
  Destroy () {
    console.log('Method Destroy of ' + this.name)
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      console.log('Destroy element ' + element.name)
      if (element.persistent === false) {
        element.Destroy()
        this.removeChild(element)
      }
    }

    console.log('removeChildren ')
    this.gaos = []
  }
}
