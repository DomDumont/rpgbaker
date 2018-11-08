const PIXI = require('pixi.js')
/** This is a description of the TileLayer
 */
export class TileLayer extends PIXI.Container {
  constructor (parent, jsonObject, loadCallback) {
    super()
    this.parent = parent
    this.jsonObject = jsonObject
    this.loadCallback = loadCallback
  }
  Init () {
    if (this.jsonObject.objects !== undefined) {
      console.log('this is an object layer')
      this.jsonObject.objects.forEach(tempObject => {
        this.loadCallback(tempObject)
      })
    }
    // Load sprites
    if (this.jsonObject.data !== undefined) {
      this.jsonObject.data.forEach((tileIdx, i) => {
        if (!tileIdx) {
          return
        }
        tileIdx = tileIdx - 1
        let imgX =
          (tileIdx % (this.parent.imageWidth / this.parent.tileWidth)) *
          this.parent.tileWidth
        let imgY =
          ~~(tileIdx / (this.parent.imageHeight / this.parent.tileHeight)) *
          this.parent.tileHeight

        let destX = (i % this.jsonObject.width) * this.parent.tileWidth
        let destY = ~~(i / this.jsonObject.width) * this.parent.tileWidth

        let tempTexture = new PIXI.Texture(
          this.parent.texture,
          new PIXI.Rectangle(
            imgX,
            imgY,
            this.parent.tileWidth,
            this.parent.tileWidth
          )
        )

        let tempSprite = new PIXI.Sprite(tempTexture)
        tempSprite.x = destX
        tempSprite.y = destY
        this.addChild(tempSprite)

        // console.log(imgX + ' ' + imgY)
      })
    }
  }
}
