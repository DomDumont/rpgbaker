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
  currentScene: number
  runCallback: any

  constructor (jsonObject: any, runCallback: any) {
    this.runCallback = runCallback
    this.jsonObject = jsonObject
    this.currentScene = 0
    this.runCallback(this, this.jsonObject.scenes[this.currentScene])
  }

  EndAction () {
    this.currentScene++
    debug('EndAction')
    if (this.currentScene >= this.jsonObject.scenes.length) {
      this.currentScene = -1
    } else {
      this.runCallback(this, this.jsonObject.scenes[this.currentScene])
    }
  }

  Update (delta: any) {
    // eval('this.' + this.jsonObject.scenes[this.currentScene].action)
  }
}
