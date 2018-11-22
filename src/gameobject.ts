import { Utils } from './utils'

import * as PIXI from 'pixi.js'
import Debug from 'debug'
import { Room } from './room'
const debug = Debug('OhYes')

// const debug = require('debug')('OhYes')
/** This is a description of the GameObject

 */

export class GameObject extends PIXI.Container {
  name: any
  room: Room
  jsonObject: any
  persistent: any
  alarms: any
  graphicsHitArea: any
  hitArea: any

  constructor (name: any, myParent: any, jsonObject: any) {
    super()
    this.name = name
    this.room = myParent
    this.jsonObject = jsonObject

    if (this.jsonObject) {
      this.x = this.jsonObject.x
      this.y = this.jsonObject.y
      this.width = this.jsonObject.width
      this.height = this.jsonObject.height
    } else {
      this.x = 0
      this.y = 0
      this.width = 0
      this.height = 0
    }

    this.persistent = false
    this.alarms = {}

    // this.pivot.x = this.width / 2
    // this.pivot.y = this.height / 2
  }
  /** This is a description of the Init function. */
  Init () {
    if (this.jsonObject) {
      this.hitArea = new PIXI.Rectangle(
        0,
        0,
        this.jsonObject.width,
        this.jsonObject.height
      )
      this.graphicsHitArea = new PIXI.Graphics()
      // graphics.beginFill(0xffff00)
      this.graphicsHitArea.lineStyle(1, 0xffff00)

      this.graphicsHitArea.drawRect(
        this.hitArea.x,
        this.hitArea.y,
        this.hitArea.width,
        this.hitArea.height
      )

      this.addChild(this.graphicsHitArea)
      this.graphicsHitArea.alpha = 0
    }
  }

  /**
   * Change the hit area to a new rectangle
   * @param {*} newRectangle
   */
  SetHitArea (newRectangle: any) {
    this.removeChild(this.graphicsHitArea)
    this.hitArea = newRectangle
    this.graphicsHitArea = new PIXI.Graphics()
    // graphics.beginFill(0xffff00)
    this.graphicsHitArea.lineStyle(1, 0xffff00)

    this.graphicsHitArea.drawRect(
      this.hitArea.x,
      this.hitArea.y,
      this.hitArea.width,
      this.hitArea.height
    )

    this.addChild(this.graphicsHitArea)
    this.graphicsHitArea.alpha = 0
  }
  /** This is a description of the Destroy function. */
  Destroy () {}

  /** This is a description of the Update function. */
  Update (delta: any) {
    // foreach alarms, if alarm = 0 call OnAlarm()
    for (var propertyName in this.alarms) {
      // propertyName is what you want
      // you can get the value like this: myObject[propertyName]
      if (this.alarms[propertyName] > 0) {
        this.alarms[propertyName]--
      } else {
        delete this.alarms[propertyName]
        this.OnAlarm(propertyName)
      }
    }
  }

  SetAlarm (alarmIndex: any, alarmNbTicks: any) {
    debug('generic SetAlarm ' + alarmIndex + ' ' + alarmNbTicks)
    this.alarms[alarmIndex] = alarmNbTicks
  }

  OnAlarm (alarmIndex: any) {
    debug('generic OnAlarm ' + alarmIndex)
  }

  With (classNameToCheck: any, callback: any) {
    let gaos = this.room.gaos

    for (let i = 0; i < gaos.length; i++) {
      let element = gaos[i]
      if (element instanceof classNameToCheck /* && element !== this */) {
        callback(element)
      }
    }
  }

  /**
   * Returns true if there is an instance of classNameToCheck at position (x,y)
   * @param {*} x x position to check
   * @param {*} y y position to check
   * @param {*} classNameToCheck className to check
   */
  PlaceMeeting (x: any, y: any, classNameToCheck: any) {
    let gaos = this.room.gaos

    let backupX = this.x
    let backupY = this.y

    this.x = x
    this.y = y

    let isThereSomethingUnder = false
    for (let i = 0; i < gaos.length; i++) {
      let element = gaos[i]
      if (element instanceof classNameToCheck && element !== this) {
        if (Utils.HitTestRectangle(this, element) === true) {
          isThereSomethingUnder = true
        }
      }
    }

    this.x = backupX
    this.y = backupY

    return isThereSomethingUnder
  }

  /**
   * Returns an object  if there is an instance of classNameToCheck at position (x,y) or null
   * @param {*} x x position to check
   * @param {*} y y position to check
   * @param {*} classNameToCheck className to check
   */
  InstancePlace (x: any, y: any, classNameToCheck: any) {
    let gaos = this.room.gaos

    let backupX = this.x
    let backupY = this.y

    this.x = x
    this.y = y

    for (let i = 0; i < gaos.length; i++) {
      let element = gaos[i]
      if (element instanceof classNameToCheck && element !== this) {
        if (Utils.HitTestRectangle(this, element) === true) {
          return element
        }
      }
    }

    this.x = backupX
    this.y = backupY

    return null
  }

  SetPosition (x: number, y: number) {
    debug('SetPosition to ' + x + ' ' + y)
    this.x = x
    this.y = y
  }

  OffsetPosition (x: number, y: number) {
    // debug('OffsetPosition by ' + x + ' ' + y)

    let hitBox1

    if (this.hitArea) {
      hitBox1 = this.hitArea
    } else hitBox1 = this.getLocalBounds()

    this.x += x
    if (this.x + hitBox1.x < 0) this.x = -hitBox1.x
    if (this.x + hitBox1.x + hitBox1.width > this.room.roomWidth) {
      this.x = this.room.roomWidth - (hitBox1.x + hitBox1.width)
    }

    this.y += y
    if (this.y + hitBox1.y < 0) this.y = -hitBox1.y
    if (this.y + hitBox1.y + hitBox1.height > this.room.roomHeight) {
      this.y = this.room.roomHeight - (hitBox1.y + hitBox1.height)
    }
  }
}
