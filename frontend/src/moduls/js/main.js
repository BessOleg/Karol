'use strict';
let {myGameArea, startGame} = require("./worldCanvas");
let {mapPropertis} = require("./storage");
let {request} = require("./inquiry")

window.onload = async () => {
    mapPropertis.mapObj.mapArray = await request("/file")
    startGame();
    myGameArea.myWindowMap();
}