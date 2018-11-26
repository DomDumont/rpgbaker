import { Camera } from './camera'
import { Input } from './input'

import * as PIXI from 'pixi.js'
// const PIXI = require('pixi.js')
// require('./pixi-layers')
import 'pixi-layers'

import Debug from 'debug'

export * from './input.js'
export * from './room.js'
export * from './gameobject.js'
export * from './tilemap.js'
export * from './tilelayer.js'
export * from './utils'
const debug = Debug('OhYes')

/** Game Class  */
export class Game {
  currentRoomKey: any
  rooms: any
  camera: any
  input: any
  groups: any
  app: any
  nextRoomKey: any
  layers: any
  mousePosition: PIXI.Point

  constructor (newWidth: any, newHeight: any) {
    debug(
      '%c rpgbaker use pixi version ' + PIXI.VERSION,
      'background: #222;color: #00ffff'
    )
    debug('%c test', 'color: #ff0000')

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

    this.mousePosition = new PIXI.Point()

    this.app.view.addEventListener('mousewheel', (ev: any) => {
      this.mousePosition.set(ev.clientX, ev.clientY) // get global position

      // returns element directly under mouse
      const found = this.app.renderer.plugins.interaction.hitTest(
        this.mousePosition,
        this.app.stage
      )

      // Dispatch scroll event
      if (found) {
        found.emit('scroll', ev)
      }
    })

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    this.groups.set('0', new PIXI.display.Group(0, false))
    this.groups.set('1', new PIXI.display.Group(1, false))
    this.groups.set('2', new PIXI.display.Group(2, false))

    this.app.stage = new PIXI.display.Stage()
    this.app.stage.group.enableSort = true

    this.layers.set('0', new PIXI.display.Layer(this.groups.get('0')))
    this.layers.set('1', new PIXI.display.Layer(this.groups.get('1')))
    this.layers.set('2', new PIXI.display.Layer(this.groups.get('2')))

    this.app.stage.addChild(this.layers.get('0'))
    this.app.stage.addChild(this.layers.get('1'))
    this.app.stage.addChild(this.layers.get('2'))

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
    debug('OnLoadedDone')
    // for (let [key, val] of this.rooms.entries()) {
    //   console.debug(key)
    //   val.Init()
    // }

    this.app.ticker.add((delta: any) => this.Update(delta))
  }

  /**
   * Add a new Room to the list of rooms
   * @param {string} roomKey - The Room key name
   * @param {Room} roomToAdd - The room object itself
   */
  AddRoom (roomToAdd: any) {
    this.app.stage.addChild(roomToAdd)
    this.rooms.set(roomToAdd.name, roomToAdd)
    this.rooms.get(roomToAdd.name).visible = false
    roomToAdd.game = this
  }

  /**
   * Goto to a specific room
   * @param {string} roomKey - The Room name
   */
  RoomGoto (roomKey: any) {
    this.nextRoomKey = roomKey
  }

  CheckRoomTransition () {
    if (this.currentRoomKey !== this.nextRoomKey) {
      let oldRoom = this.rooms.get(this.currentRoomKey)
      let newRoom = this.rooms.get(this.nextRoomKey)

      if (oldRoom) {
        oldRoom.TransferPersistentObjectsTo(newRoom)
        oldRoom.Destroy()
      }
      this.currentRoomKey = this.nextRoomKey

      newRoom.Init()

      for (let [, val] of this.rooms.entries()) {
        val.visible = false
      }
      newRoom.visible = true
    }
  }
  Update (delta: any) {
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
