import * as PIXI from 'pixi.js'
import Debug from 'debug'
import { Room } from './room'
import { GameObject } from './gameobject'
import { Utils } from './utils'
const debug = Debug('OhYes')

/** This is a description of the CutScene
 */
export class CutScene {
  jsonObject: any
  timer: number
  currentScene: number
  name: string
  room: Room
  destX: number
  destY: number

  constructor (name: string, myParent: Room, jsonObject: any) {
    this.name = name
    this.room = myParent
    this.jsonObject = jsonObject
    this.timer = 0
    this.currentScene = 0
    this.destX = -1
    this.destY = -1
  }

  Wait (nbSeconds: number) {
    // debug('Wait ' + nbSeconds)
    this.timer++
    // TODO change this to ticker.fps
    if (this.timer > nbSeconds * 60) {
      this.timer = 0
      this.EndAction()
    }
  }

  Move (
    objectName: string,
    x: number,
    y: number,
    relative: boolean,
    speed: number
  ) {
    debug('Move ' + objectName + ' ' + x + ' ' + y)

    let tempGAO: GameObject = this.room.GetGAOByName(objectName)
    if (tempGAO === undefined) {
      debug(objectName + ' object cannot be found ')
      return
    }
    if (this.destX === -1 && this.destY === -1) {
      if (relative === true) {
        this.destX = tempGAO.x + x
        this.destY = tempGAO.y + y
      } else {
        this.destX = x
        this.destY = y
      }
    }

    let distanceToTarget: number = Utils.PointDistance(
      tempGAO.x,
      tempGAO.y,
      this.destX,
      this.destY
    )
    debug('distanceToTarget ' + distanceToTarget)
    if (distanceToTarget >= speed) {
      let angle: number = Utils.PointDirection(
        tempGAO.x,
        tempGAO.y,
        this.destX,
        this.destY
      )

      debug(angle)
      let ldirx: number = Utils.LengthDirX(speed, angle)
      let ldiry: number = Utils.LengthDirY(speed, angle)
      tempGAO.x += ldirx
      tempGAO.y += ldiry
    } else {
      tempGAO.x = this.destX
      tempGAO.y = this.destY
      this.destX = -1
      this.destY = -1
      this.EndAction()
    }
  }

  EndAction () {
    this.currentScene++
    debug('EndAction')
    if (this.currentScene >= this.jsonObject.scenes.length) {
      this.currentScene = -1
    }
  }

  Update (delta: any): boolean {
    if (this.currentScene === -1) return false

    eval('this.' + this.jsonObject.scenes[this.currentScene].action)
    return true
  }
}
