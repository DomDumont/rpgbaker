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

  static HitTestHardCodedRectangle (r1: PIXI.Rectangle, r2: PIXI.Container) {
    // Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy

    // hit will determine whether there's a collision
    hit = false

    let hitBox1: PIXI.Rectangle
    let hitBox2: PIXI.Rectangle

    hitBox1 = new PIXI.Rectangle(0, 0, r1.width, r1.height)

    if (r2.hitArea) hitBox2 = r2.hitArea as PIXI.Rectangle
    else hitBox2 = r2.getLocalBounds()

    // Find the center points of each sprite
    let r1centerX = r1.x + hitBox1.x + hitBox1.width / 2
    let r1centerY = r1.y + hitBox1.y + hitBox1.height / 2
    let r2centerX = r2.x + hitBox2.x + hitBox2.width / 2
    let r2centerY = r2.y + hitBox2.y + hitBox2.height / 2

    // Find the half-widths and half-heights of each sprite
    let r1halfWidth = hitBox1.width / 2
    let r1halfHeight = hitBox1.height / 2
    let r2halfWidth = hitBox2.width / 2
    let r2halfHeight = hitBox2.height / 2

    // Calculate the distance vector between the sprites
    vx = r1centerX - r2centerX
    vy = r1centerY - r2centerY

    // Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1halfWidth + r2halfWidth
    combinedHalfHeights = r1halfHeight + r2halfHeight

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

  static HitTestRectangle (r1: PIXI.Container, r2: PIXI.Container) {
    // Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy

    // hit will determine whether there's a collision
    hit = false

    let hitBox1: PIXI.Rectangle
    let hitBox2: PIXI.Rectangle

    if (r1.hitArea) {
      hitBox1 = r1.hitArea as PIXI.Rectangle
    } else hitBox1 = r1.getLocalBounds()

    if (r2.hitArea) hitBox2 = r2.hitArea as PIXI.Rectangle
    else hitBox2 = r2.getLocalBounds()

    // Find the center points of each sprite
    let r1centerX = r1.x + hitBox1.x + hitBox1.width / 2
    let r1centerY = r1.y + hitBox1.y + hitBox1.height / 2
    let r2centerX = r2.x + hitBox2.x + hitBox2.width / 2
    let r2centerY = r2.y + hitBox2.y + hitBox2.height / 2

    // Find the half-widths and half-heights of each sprite
    let r1halfWidth = hitBox1.width / 2
    let r1halfHeight = hitBox1.height / 2
    let r2halfWidth = hitBox2.width / 2
    let r2halfHeight = hitBox2.height / 2

    // Calculate the distance vector between the sprites
    vx = r1centerX - r2centerX
    vy = r1centerY - r2centerY

    // Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1halfWidth + r2halfWidth
    combinedHalfHeights = r1halfHeight + r2halfHeight

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
