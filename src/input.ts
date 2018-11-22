/** Input Class  */

export class Input {
  vk_escape: any
  vk_left: any
  vk_up: any
  vk_right: any
  vk_down: any
  vk_left_shift: any
  vk_d: any
  keyStates: any
  previousKeyStates: any
  realStates: any

  constructor () {
    // TODO Should probably be elsewhere
    this.vk_escape = 27
    this.vk_left = 37
    this.vk_up = 38
    this.vk_right = 39
    this.vk_down = 40
    this.vk_left_shift = 16
    this.vk_d = 68

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
    // debug('key = ' + key)
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
