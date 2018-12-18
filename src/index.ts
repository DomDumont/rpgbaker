import { Camera } from './camera'
import { Input } from './input'

import * as PIXI from 'pixi.js'

import Debug from 'debug'
import { Room } from './room'

export * from './input'
export * from './room'
export * from './gameobject'
export * from './tilemap'
export * from './tilelayer'
export * from './utils'
export * from './cutscene'
export * from './astar'
const debug = Debug('OhYes')

/** Game Class  */
export class Game {
  currentRoomKey: string
  rooms: Map<string, Room>
  camera: any
  input: any
  groups: any
  app: PIXI.Application
  nextRoomKey: any
  layers: any
  mousePosition: PIXI.Point
  UI: PIXI.Container

  constructor (newWidth: number, newHeight: number) {
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
    debug('OnLoadedDone')

    this.UI = new PIXI.Container()
    this.app.stage.addChild(this.UI)

    debug('Start the game loop')
    this.app.ticker.add((delta: any) => this.Update(delta))
  }

  /**
   * Add a new Room to the list of rooms
   * @param {string} roomKey - The Room key name
   * @param {Room} roomToAdd - The room object itself
   */
  AddRoom (roomToAdd: Room) {
    this.app.stage.addChild(roomToAdd)
    this.rooms.set(roomToAdd.name, roomToAdd)
    this.rooms.get(roomToAdd.name).visible = false
    roomToAdd.SetGame(this)
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

    this.UI.x = -this.app.stage.x
    this.UI.y = -this.app.stage.y
  }

  GetCurrentRoom () {
    return this.rooms.get(this.currentRoomKey)
  }

  GetCurrentRoomWidth () {
    let currentRoom: Room = this.GetCurrentRoom()
    if (currentRoom) {
      return currentRoom.roomWidth
    } else return 0
  }

  GetCurrentRoomHeight () {
    let currentRoom: Room = this.GetCurrentRoom()
    if (currentRoom) {
      return currentRoom.roomHeight
    } else return 0
  }
}
