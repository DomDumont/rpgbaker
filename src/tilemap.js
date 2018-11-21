import { TileLayer } from './tilelayer'
import { TileSet } from './tileset'

const PIXI = require('pixi.js')

/** This is a description of the TileMap
 */
export class TileMap extends PIXI.Container {
  constructor (jsonObject, loadCallback) {
    super()
    this.jsonObject = jsonObject
    this.layers = {}
    this.tilesets = {}
    this.loadCallback = loadCallback
  }

  // TODO Change this
  Init () {
    this.jsonObject.tilesets.forEach(tileset => {
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

    this.jsonObject.layers.forEach(layer => {
      // debug('renderLayer ' + layer.name)
      this.layers[layer.name] = new TileLayer(this, layer, this.loadCallback)
      this.layers[layer.name].Init()
      // debug('addchild du tile ' + layer.name)
      this.addChild(this.layers[layer.name])
    })
  }

  Update (delta) {}

  FindTilesetForGID (gid) {
    let minDifference = 0xffff
    let minKey
    for (const [key, value] of Object.entries(this.tilesets)) {
      let tempDiff = gid - value.firstGid
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
