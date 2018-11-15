import { Utils } from './utils'
const PIXI = require('pixi.js')

export class GameObject extends PIXI.Container {
  constructor (myParent, jsonObject) {
    super()
    this.myParent = myParent
    this.jsonObject = jsonObject

    this.x = this.jsonObject.x
    this.y = this.jsonObject.y
    this.width = this.jsonObject.width
    this.height = this.jsonObject.height

    this.alarms = {}

    // this.pivot.x = this.width / 2
    // this.pivot.y = this.height / 2
  }
  /** This is a description of the Init function. */
  Init () {}

  /** This is a description of the Destroy function. */
  Destroy () {}

  /** This is a description of the Update function. */
  Update (delta) {
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

  SetAlarm (alarmIndex, alarmNbTicks) {
    console.log('generic SetAlarm ' + alarmIndex + ' ' + alarmNbTicks)
    this.alarms[alarmIndex] = alarmNbTicks
  }

  OnAlarm (alarmIndex) {
    console.log('generic OnAlarm ' + alarmIndex)
  }

  PlaceMeeting (x, y, classNameToCheck) {
    let gaos = this.myParent.gaos

    let backupX = this.x
    let backupY = this.y

    this.x = x
    this.y = y

    let isThereSomethingUnder = false
    for (let i = 0; i < gaos.length; i++) {
      let element = gaos[i]
      if (classNameToCheck.name === element.constructor.name) {
        if (Utils.HitTestRectangle(this, element) === true) {
          isThereSomethingUnder = true
        }
      }
    }

    this.x = backupX
    this.y = backupY

    return isThereSomethingUnder
  }
}
