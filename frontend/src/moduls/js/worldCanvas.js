'use strict';
let {mapPropertis, htmlObj, KarelCodeManag} = require("./storage");
let {render} = require("./render");
let {worldgen} = require("./worldLoad");
let $ = require("jquery");
//jquery add


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
            // console.log(myGameArea);
            myGameArea.canvas.width = mapPropertis.mapObj.mapArray[mapPropertis.idexSelect][0].width * mapPropertis.windowMap.x;
            myGameArea.canvas.height = mapPropertis.mapObj.mapArray[mapPropertis.idexSelect][0].height * mapPropertis.windowMap.y;
        }
        //myGameArea.context = tool.ctx


        myGameArea.interval = setInterval(() => render(myGameArea), 30);

        mapPropertis.boolstart = false;
        htmlObj.restart.innerText = "stop";
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
        htmlObj.lvlSelect.value = mapPropertis.idexSelect >= htmlObj.lvlSelect.length ? 1 : htmlObj.lvlSelect.value + 1;
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
    }

};
let startGame = () => {
    if (mapPropertis.boolstart) {
        mapPropertis.idexSelect = parseInt($("select").val()) - 1;
        worldgen();
        myGameArea.start();

    } else {
        myGameArea.stop();
        myGameArea.clear();
    }
};

module.exports = {
    "myGameArea": myGameArea,
    "startGame": startGame
};
