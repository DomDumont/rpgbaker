import foo from './foo.js'
const PIXI = require('pixi.js')

// export default function () {
//   console.log(foo)
//   console.log(PIXI.VERSION)
// }

export * from './input.js'

/** Game Class  */
export class Game {
  constructor () {
    console.log('rpgbaker use pixi version ' + PIXI.VERSION)
  }
}
