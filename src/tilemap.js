import { TileLayer } from './tilelayer'

const PIXI = require('pixi.js')

/** This is a description of the TileMap
 */
export class TileMap extends PIXI.Container {
  constructor (jsonObject, loadCallback) {
    super()
    this.jsonObject = jsonObject
    this.layers = {}
    this.loadCallback = loadCallback
  }

  // TODO Change this
  Init (newTexture) {
    this.imageWidth = this.jsonObject.tilesets[0].imagewidth
    this.imageHeight = this.jsonObject.tilesets[0].imageheight
    this.tileWidth = this.jsonObject.tilesets[0].tilewidth
    this.tileHeight = this.jsonObject.tilesets[0].tileheight

    console.log(this.jsonObject.tilesets[0].image) // TODO Change this
    this.texture = PIXI.loader.resources[newTexture].texture // TODO Change this

    this.graphics = new PIXI.Graphics()
    this.graphics.lineStyle(2, 0x0000ff, 1)
    this.graphics.beginFill(0xff700b, 1)
    this.graphics.drawRect(50, 250, 250, 250)
    this.graphics.endFill()
    // this.addChild(this.graphics)

    this.jsonObject.layers.forEach(layer => {
      console.log('renderLayer ' + layer.name)
      this.layers[layer.name] = new TileLayer(this, layer, this.loadCallback)
      this.layers[layer.name].Init()
      console.log('addchild du tile ' + layer.name)
      this.addChild(this.layers[layer.name])
    })
  }

  Update (delta) {}
}

/*
function testTiled () {
  console.log(testTiled)
  console.dir(map01)
  map01.layers.forEach(renderLayer)
}

function renderLayer (layer) {
  console.log('renderLayer ' + layer.name)
  layer.data.forEach(function (tileIndex, i) {
    if (!tileIndex) {
      return
    }
    let size = map01.tilewidth
    let imageX

    let imageY

    let sourceX

    let sourceY

    let tile = map01.tilesets[0]
    tileIndex--
    imageX = (tileIndex % (tile.imagewidth / size)) * size
    imageY = ~~(tileIndex / (tile.imagewidth / size)) * size
    sourceX = (i % layer.width) * size
    sourceY = ~~(i / layer.width) * size
  })
}

 */
