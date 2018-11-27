import * as PIXI from 'pixi.js'
import { TileMap } from './tilemap'

/** This is a description of the TileLayer
 */
export class TileLayer extends PIXI.Container {
  myParent: TileMap
  jsonObject: any
  loadCallback: any

  constructor (myParent: any, jsonObject: any, loadCallback: any) {
    super()
    this.myParent = myParent
    this.jsonObject = jsonObject
    this.loadCallback = loadCallback
  }
  Init () {
    if (this.jsonObject.objects !== undefined) {
      // debug('this is an object layer')
      this.jsonObject.objects.forEach((tempObject: any) => {
        this.loadCallback(this, tempObject)
      })
    }
    // Load sprites
    if (this.jsonObject.data !== undefined) {
      this.jsonObject.data.forEach((tileIdx: any, i: any) => {
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
      })
    }
  }

  GetData (x: number, y: number): any {
    let tempNumber = y * this.jsonObject.width + x
    return this.jsonObject.data[tempNumber]
  }
}
