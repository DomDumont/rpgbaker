import * as PIXI from 'pixi.js'
// const PIXI = require('pixi.js')

export class Utils {
  static PointInRectangle (x: any, y: any, r1: any) {
    if (
      x >= r1.x &&
      x <= r1.x + r1.width &&
      y >= r1.y &&
      y <= r1.y + r1.height
    ) {
      return true
    } else {
      return false
    }
  }
  static HitTestRectangle (r1: any, r2: any) {
    // Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy

    // hit will determine whether there's a collision
    hit = false

    let hitBox1
    let hitBox2

    if (r1.hitArea) {
      hitBox1 = r1.hitArea
    } else hitBox1 = r1.getLocalBounds()

    if (r2.hitArea) hitBox2 = r2.hitArea
    else hitBox2 = r2.getLocalBounds()

    // Find the center points of each sprite
    r1.centerX = r1.x + hitBox1.x + hitBox1.width / 2
    r1.centerY = r1.y + hitBox1.y + hitBox1.height / 2
    r2.centerX = r2.x + hitBox2.x + hitBox2.width / 2
    r2.centerY = r2.y + hitBox2.y + hitBox2.height / 2

    // Find the half-widths and half-heights of each sprite
    r1.halfWidth = hitBox1.width / 2
    r1.halfHeight = hitBox1.height / 2
    r2.halfWidth = hitBox2.width / 2
    r2.halfHeight = hitBox2.height / 2

    // Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX
    vy = r1.centerY - r2.centerY

    // Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth
    combinedHalfHeights = r1.halfHeight + r2.halfHeight

    // Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      // A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        // There's definitely a collision happening
        hit = true
      } else {
        // There's no collision on the y axis
        hit = false
      }
    } else {
      // There's no collision on the x axis
      hit = false
    }

    // `hit` will be either `true` or `false`
    return hit
  }

  static GetTexturePart (texture: any, x: any, y: any, w: any, h: any) {
    return new PIXI.Texture(texture, new PIXI.Rectangle(x, y, w, h))
  }

  static GetRandomFloat (min: any, max: any) {
    return Math.random() * (max - min) + min
  }

  static GetRandomInt (min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  static GetRandomBool () {
    return Math.random() >= 0.5
  }
}
