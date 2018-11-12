import { Camera } from './camera'
import { Input } from './input'

const PIXI = require('pixi.js')
require('./pixi-layers')

export * from './input.js'
export * from './room.js'
export * from './gameobject.js'
export * from './tilemap.js'
export * from './tilelayer.js'
export * from './utils.js'

/** Game Class  */
export class Game {
  constructor (newWidth, newHeight) {
    console.log('rpgbaker use pixi version ' + PIXI.VERSION)

    this.rooms = new Map()
    this.layers = new Map()
    this.groups = new Map()

    this.app = new PIXI.Application({
      width: newWidth, // default: 800
      height: newHeight, // default: 600
      antialias: false, // default: false
      transparent: false, // default: false
      resolution: 1 // default: 1
    })

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    this.groups.set('0', new PIXI.display.Group(0, false))
    this.groups.set('1', new PIXI.display.Group(1, false))

    this.app.stage = new PIXI.display.Stage()
    this.app.stage.group.enableSort = true

    this.layers.set('0', new PIXI.display.Layer(this.groups.get('0')))
    this.layers.set('1', new PIXI.display.Layer(this.groups.get('1')))

    this.app.stage.addChild(this.layers.get('0'))
    this.app.stage.addChild(this.layers.get('1'))

    // Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(this.app.view)

    this.currentRoomKey = ''
    this.nextRoomKey = ''

    this.camera = new Camera(this)
    this.input = new Input()

    this.OnLoadedDone = this.OnLoadedDone.bind(this)
  }
  Init () {
    // load an image and run the `setup` function when it's done
    PIXI.loader.load(this.OnLoadedDone)

    // Maybe one day this.input.Init()
  }

  OnLoadedDone () {
    // Start the game loop
    console.log('OnLoadedDone')
    // for (let [key, val] of this.rooms.entries()) {
    //   console.debug(key)
    //   val.Init()
    // }

    this.app.ticker.add(delta => this.Update(delta))
  }

  /**
   * Add a new Room to the list of rooms
   * @param {string} roomKey - The Room key name
   * @param {Room} roomToAdd - The room object itself
   */
  AddRoom (roomKey, roomToAdd) {
    this.app.stage.addChild(roomToAdd)
    this.rooms.set(roomKey, roomToAdd)
    this.rooms.get(roomKey).visible = false
    roomToAdd.game = this
  }

  /**
   * Goto to a specific room
   * @param {string} roomKey - The Room name
   */
  RoomGoto (roomKey) {
    this.nextRoomKey = roomKey
  }

  CheckRoomTransition () {
    if (this.currentRoomKey !== this.nextRoomKey) {
      let currentRoom = this.rooms.get(this.currentRoomKey)
      if (currentRoom) currentRoom.Destroy()
      this.currentRoomKey = this.nextRoomKey
      this.rooms.get(this.currentRoomKey).Init()
      for (let [, val] of this.rooms.entries()) {
        val.visible = false
      }
      this.rooms.get(this.currentRoomKey).visible = true
    }
  }
  Update (delta) {
    // message.setText(Math.round(app.ticker.FPS))
    this.input.Update()
    this.camera.Update(delta)
    this.CheckRoomTransition()
    for (let [key, val] of this.rooms.entries()) {
      // TODO change this
      if (key === this.currentRoomKey) {
        val.Update(delta)
      }
    }
  }

  GetCurrentRoom () {
    return this.rooms.get(this.currentRoomKey)
  }
}
