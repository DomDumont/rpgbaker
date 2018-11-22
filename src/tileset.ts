import * as PIXI from 'pixi.js'
import { TileMap } from './tilemap'

export class TileSet {
  myParent: TileMap
  jsonObject: any
  name: any
  firstGid: any
  imageWidth: any
  imageHeight: any
  tileWidth: any
  tileHeight: any
  texture: any

  constructor (myParent: any, jsonObject: any) {
    this.myParent = myParent
    this.jsonObject = jsonObject
  }

  Init () {
    this.name = this.jsonObject.name
    this.firstGid = this.jsonObject.firstgid
    this.imageWidth = this.jsonObject.imagewidth
    this.imageHeight = this.jsonObject.imageheight
    this.tileWidth = this.jsonObject.tilewidth
    this.tileHeight = this.jsonObject.tileheight

    let tempTextureName = 'assets/' + this.jsonObject.image
    this.texture = PIXI.loader.resources[tempTextureName].texture // TODO Change this
  }
}
