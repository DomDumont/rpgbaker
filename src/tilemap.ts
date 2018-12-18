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
  grid: number[][]
  graph: Graph

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

    this.jsonObject.layers.forEach((layer: any) => {
      // debug('renderLayer ' + layer.name)
      this.layers[layer.name] = new TileLayer(this, layer, this.loadCallback)
      this.layers[layer.name].Init()
      // debug('addchild du tile ' + layer.name)
      if (layer.name === 'Col') {
        this.InitGridFromLayer(this.layers[layer.name])
      }
      this.addChild(this.layers[layer.name])
    })
  }

  InitGridFromLayer (layer: TileLayer) {
    for (let i = 0; i < this.jsonObject.width; i++) {
      for (let j = 0; j < this.jsonObject.height; j++) {
        this.grid[i][j] = layer.GetData(i, j)
      }
    }
    this.graph = new Graph(this.grid, {})
  }
  Update (delta: any) {
    for (const [key, value] of Object.entries(this.layers)) {
      let tempLayer: TileLayer = value as TileLayer
      tempLayer.Update(delta)
    }
  }

  FindPath (fromX: number, fromY: number, toX: number, toY: number): GridNode[] {
    let startNode: GridNode = new GridNode(fromX, fromY, 0)
    let endNode: GridNode = new GridNode(toX, toY, 0)
    return AStar.Search(this.graph, startNode, endNode, {})
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
    }

    return this.tilesets[minKey]
  }
}
