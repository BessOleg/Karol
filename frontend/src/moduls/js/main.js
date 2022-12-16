'use strict';
let {myGameArea, startGame} = require("./worldCanvas");
let {mapPropertis} = require("./storage");
let {request} = require("./inquiry")

window.onload = async () => {
    mapPropertis.mapObj.mapArray = await request("/file")
   // console.log(mapPropertis.mapObj.mapArray)
    startGame();
    myGameArea.myWindowMap();
}
//
// async function CanvasLoad() {
//     mapPropertis.mapObj.mapArray = await request("/file")
//     console.log(await request("/file"))
//     console.log(mapPropertis.mapObj.mapArray)
//
//     //console.log(myGameArea.canvas.width)
//     console.log(mapPropertis.mapObj.mapArray[0][0].width)
//
//     startGame();
//     myGameArea.myWindowMap();
// }
//
// module.exports.CanvasLoad = CanvasLoad;