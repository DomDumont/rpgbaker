import Debug from 'debug'
const debug = Debug('OhYes')

/** Input Class  */

export class Input {
  keyStates: any
  previousKeyStates: any
  realStates: any

  constructor () {
    // TODO Should probably be elsewhere

    this.keyStates = new Array(256)
    this.previousKeyStates = new Array(256)
    this.realStates = new Array(256)

    for (let i = 0; i < 256; i++) {
      this.realStates[i] = false
      this.keyStates[i] = false
      this.previousKeyStates[i] = false
    }

    window.addEventListener('keydown', this.DownHandler.bind(this), false)
    window.addEventListener('keyup', this.UpHandler.bind(this), false)
  }
  Update (delta: any) {
    this.previousKeyStates = this.keyStates.slice(0)
    this.keyStates = this.realStates.slice(0)
  }

  IsKeyDown (keyCode: any) {
    return this.keyStates[keyCode]
  }

  IsKeyPressed (keyCode: any) {
    let result =
      this.keyStates[keyCode] === true &&
      this.previousKeyStates[keyCode] === false
    return result
  }

  DownHandler (event: any) {
    var key = window.event ? event.keyCode : event.which
    debug('key = ' + key)
    event.preventDefault()
    this.realStates[key] = true
  }

  UpHandler (event: any) {
    var key = window.event ? event.keyCode : event.which
    // debug('key up = ' + key)
    event.preventDefault()
    this.realStates[key] = false
  }
}

export namespace Input {
  export enum Keycodes {
    D = 68,
    P = 80,
    G = 71,
    ESCAPE = 27,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    LEFT_SHIFT = 16
  }
}
