/** Input Class  */
export class Input {
  constructor () {
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
  Update (delta) {
    this.previousKeyStates = this.keyStates.slice(0)
    this.keyStates = this.realStates.slice(0)
  }

  IsKeyDown (keyCode) {
    return this.keyStates[keyCode]
  }

  IsKeyPressed (keyCode) {
    let result =
      this.keyStates[keyCode] === true &&
      this.previousKeyStates[keyCode] === false
    return result
  }

  DownHandler (event) {
    var key = window.event ? event.keyCode : event.which
    console.log('key = ' + key)
    event.preventDefault()
    this.realStates[key] = true
  }

  UpHandler (event) {
    var key = window.event ? event.keyCode : event.which
    console.log('key up = ' + key)
    event.preventDefault()
    this.realStates[key] = false
  }
}

// TODO Should probably be elsewhere
Input.vk_escape = 27
Input.vk_left = 37
Input.vk_up = 38
Input.vk_right = 39
Input.vk_down = 40
