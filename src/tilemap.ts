import { TileLayer } from './tilelayer'
import { TileSet } from './tileset'
import * as PIXI from 'pixi.js'


/** This is a description of the TileMap
 */
export class TileMap extends PIXI.Container {
  jsonObject: any
  layers: any
  tilesets: any
  loadCallback: any
  graphics: any


  constructor (jsonObject: any, loadCallback: any) {
    super()
    this.jsonObject = jsonObject
    this.layers = {}
    this.tilesets = {}
    this.loadCallback = loadCallback


  }

  // TODO Change this
  Init () {
    this.jsonObject.tilesets.forEach((tileset: any) => {
      // debug('tileset ' + tileset.name)
      this.tilesets[tileset.name] = new TileSet(this, tileset)
      this.tilesets[tileset.name].Init()
    })

    this.graphics = new PIXI.Graphics()
    this.graphics.lineStyle(2, 0x0000ff, 1)
    this.graphics.beginFill(0xff700b, 1)
    this.graphics.drawRect(50, 250, 250, 250)
    this.graphics.endFill()
    // this.addChild(this.graphics)

    this.jsonObject.layers.forEach((layer: any) => {
      // debug('renderLayer ' + layer.name)
      this.layers[layer.name] = new TileLayer(this, layer, this.loadCallback)
      this.layers[layer.name].Init()
      // debug('addchild du tile ' + layer.name)
      this.addChild(this.layers[layer.name])
    })
  }

  Update (delta: any) {
    for (const [key, value] of Object.entries(this.layers)) {
      let tempLayer: TileLayer = value as TileLayer
      tempLayer.Update(delta)
    }
  }

  FindTilesetForGID (gid: any) {
    let minDifference = 0xffff
    let minKey: any
    for (const [key, value] of Object.entries(this.tilesets)) {
      let tempTileset: TileSet = value as TileSet
      let tempDiff = gid - tempTileset.firstGid
      if (tempDiff > 0 && tempDiff < minDifference) {
        minDifference = tempDiff
        minKey = key
      }
      // key: the name of the object key
      // index: the ordinal position of the key within the object
    }

    return this.tilesets[minKey]
  }
}
