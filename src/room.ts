import * as PIXI from 'pixi.js'
import Debug from 'debug'
import { GameObject } from './gameobject'
const debug = Debug('OhYes')

/** This is a description of the Room
 * @tutorial tutorial-room
 */
export class Room extends PIXI.Container {
  gaos: any
  game: any
  name: string

  roomWidth: number = 0
  roomHeight: number = 0

  constructor (name: string) {
    super()
    this.gaos = []
    this.game = undefined
    this.name = name
  }
  /** This is a description of the Init function. */
  Init () {
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      if (element.persistent === false) {
        element.Init()
      }
      element.OnRoomStart()
    }
  }

  /** This is a description of the Update function. */
  Update (delta: any) {
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
  AddGAO (newObject: any) {
    debug('AddGAO ' + newObject.name)
    this.gaos.push(newObject)
  }

  /**
   * Try to find a GAO by its name
   * @param nameToGet
   */
  GetGAOByName (nameToGet: string) {
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      if (element.name === nameToGet) {
        return element
      }
    }

    return undefined
  }

  TransferPersistentObjectsTo (newRoom: Room) {
    for (let i = 0; i < this.gaos.length; i++) {
      let element: GameObject = this.gaos[i] as GameObject
      if (element.persistent === true) {
        debug('Transfert ' + element.constructor.name)
        element.room = newRoom
        newRoom.AddGAO(element)
        newRoom.addChild(element)
      }
    }
  }
  /**
   * Called when the room is destroyed. Try to destroy all gaos
   */
  Destroy () {
    debug('Method Destroy of ' + this.name)
    for (let i = 0; i < this.gaos.length; i++) {
      let element = this.gaos[i]
      debug('Destroy element ' + element.name)
      if (element.persistent === false) {
        element.Destroy()
        this.removeChild(element)
      }
    }

    debug('removeChildren ')
    this.gaos = []
  }
}
