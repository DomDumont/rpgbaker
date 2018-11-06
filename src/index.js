import foo from "./foo.js";
const PIXI = require("pixi.js");
export default function() {
  console.log(foo);
  console.log(PIXI.VERSION);
}
