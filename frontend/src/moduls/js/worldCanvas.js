'use strict';
let {mapPropertis, htmlObj, KarelCodeManag, game} = require("./storage");
let {render} = require("./render");
let {worldgen} = require("./worldLoad");
let $ = require("jquery");
const {component} = require("./entity");

let myGameArea = {
    canvas: null,
    myWindowMap: () => {
        mapPropertis.windowMap.x = Math.round((window.innerWidth / 320) * 20);
        mapPropertis.windowMap.y = Math.round((window.innerHeight / 480) * 35);
        myGameArea.clear();
        myGameArea.stop();
        startGame();
    },
    start: () => {
        if (mapPropertis.mapObj.mapFlag === false) {
            myGameArea.canvas.width = mapPropertis.mapObj.mapArray[mapPropertis.idexSelect][0].width * mapPropertis.windowMap.x;
            myGameArea.canvas.height = mapPropertis.mapObj.mapArray[mapPropertis.idexSelect][0].height * mapPropertis.windowMap.y;
        }
        myGameArea.interval = setInterval(() => render(myGameArea), 30);
        mapPropertis.boolstart = false;
        htmlObj.restart.innerText = "stop";
      //  myGameArea.hardGame();
       // myGameArea.hardGame()
    },
    clear: () => {
        myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    },
    stop: () => {
        mapPropertis.wallMass = [];
        mapPropertis.boolstart = true;
        mapPropertis.levelTurn = 2;
        htmlObj.restart.attr("disabled", true);
        if (mapPropertis.mapObj.mapFlag) {
            mapPropertis.mapObj.mapFlag = false;
        }
        htmlObj.restart.removeAttr('disabled');
        htmlObj.restart.innerText = "start";
        clearInterval(this.interval);
    },
    newlvl: () => {
        alert("You WIN! \n  You error: " + KarelCodeManag.error);
        htmlObj.lvlSelect.value = (mapPropertis.idexSelect + 2) > htmlObj.lvlSelect.length ? 1 : mapPropertis.idexSelect + 2;
        startGame();
        startGame();
    },
    netupdate: () => {
        myGameArea.context.strokeStyle = "rgba(16,206,202,0.56)";
        myGameArea.context.beginPath();
        for (let x = 0; x < myGameArea.canvas.width; x += mapPropertis.windowMap.x) {
            myGameArea.context.moveTo(x, 0);
            myGameArea.context.lineTo(x, myGameArea.canvas.height);
        }
        for (let y = 0; y < myGameArea.canvas.height; y += mapPropertis.windowMap.y) {
            myGameArea.context.moveTo(0, y);
            myGameArea.context.lineTo(myGameArea.canvas.width, y);
        }
        myGameArea.context.stroke();
    },
    hardGame: () => {
        var masBall = [];
        levelgeneration(masBall)
        mapPropertis["saveWallMass"] = mapPropertis.wallMass;
        mapPropertis.wallMass = masBall;
    }

};
let startGame = () => {
    if (mapPropertis.boolstart) {
        mapPropertis.idexSelect = htmlObj.lvlSelect.value - 1;
        worldgen();
        myGameArea.start();

    } else {
        myGameArea.stop();
        myGameArea.clear();
    }
};

let levelgeneration = (pool) => {
    for (let x = 0; x < myGameArea.canvas.width; x += mapPropertis.windowMap.x) {
        for (let y = 0; y < myGameArea.canvas.height; y += mapPropertis.windowMap.y) {
            pool.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, game[Math.floor((Math.random() * 6+1))], x, y, "image"))
        }
    }
}

module.exports = {
    "myGameArea": myGameArea,
    "startGame": startGame
};
