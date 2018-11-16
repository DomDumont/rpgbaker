const PIXI = require('pixi.js')
/** This is a description of the TileLayer
 */
export class TileLayer extends PIXI.Container {
  constructor (myParent, jsonObject, loadCallback) {
    super()
    this.myParent = myParent
    this.jsonObject = jsonObject
    this.loadCallback = loadCallback
  }
  Init () {
    if (this.jsonObject.objects !== undefined) {
      // console.log('this is an object layer')
      this.jsonObject.objects.forEach(tempObject => {
        this.loadCallback(this, tempObject)
      })
    }
    // Load sprites
    if (this.jsonObject.data !== undefined) {
      this.jsonObject.data.forEach((tileIdx, i) => {
        if (!tileIdx) {
          return
        }

        // Here find the right tileset
        let chosenTileset = this.myParent.FindTilesetForGID(tileIdx)
        tileIdx = tileIdx - chosenTileset.firstGid
        let imgX =
          (tileIdx % (chosenTileset.imageWidth / chosenTileset.tileWidth)) *
          chosenTileset.tileWidth
        let imgY =
          ~~(tileIdx / (chosenTileset.imageWidth / chosenTileset.tileWidth)) *
          chosenTileset.tileWidth

        let destX = (i % this.jsonObject.width) * chosenTileset.tileWidth
        let destY = ~~(i / this.jsonObject.width) * chosenTileset.tileWidth

        let tempTexture = new PIXI.Texture(
          chosenTileset.texture,
          new PIXI.Rectangle(
            imgX,
            imgY,
            chosenTileset.tileWidth,
            chosenTileset.tileWidth
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
