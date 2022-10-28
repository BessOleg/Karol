'use strict';

let {htmlObj, mapPropertis} = require("./storage");
let {Controls} = require("./control");
let {myGameArea, startGame} = require("./worldCanvas");


$("#go").click(() => Controls.move());
$("#turn").click(() => Controls.turn());
$("#token").click(() => Controls.token());

htmlObj.Window.resize(() => {
    myGameArea.myWindowMap();
});

htmlObj.restart.on("mousedown", () => {
    startGame();
    startGame();
});

//load map of user file
htmlObj.FileLoad.on('change', () => {
    let file = mapPropertis.FileLoad.files[0];
    //console.log(mapPropertis.FileLoad.files[0]);
    let read = new FileReader();
    read.readAsText(file);
    read.onload = () => {
        mapPropertis.mapObj.mapArray = JSON.parse(read.result)
    };
    mapPropertis.mapObj.mapFlag = true;
    htmlObj.restart.removeAttribute('disabled');
    //startGame();
});

