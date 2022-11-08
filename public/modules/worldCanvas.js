'use strict';
let {mapPropertis, htmlObj, KarelCodeManag} = require("./storage");
let {render} = require("./render");
let {worldgen} = require("./worldLoad");


let myGameArea = {
    canvas: $("#Canvas")[0],
    myWindowMap: () => {
        mapPropertis.windowMap.x = Math.round((window.innerWidth / 320) * 20);
        mapPropertis.windowMap.y = Math.round((window.innerHeight / 480) * 35);
        //KarelCodeManag.stepKerrol=[];
        //worldgen();
        myGameArea.clear();
        myGameArea.stop();
        startGame();
    },
    start: () => {
        if (mapPropertis.mapObj.mapFlag === false) {
            // console.log("server");
            myGameArea.canvas.width = mapPropertis.idexSelect >= 2 ? mapPropertis.windowMap.x * 5 : mapPropertis.mapObj.mapArray[mapPropertis.idexSelect][0].width * mapPropertis.windowMap.x;
            myGameArea.canvas.height = mapPropertis.idexSelect >= 2 ? mapPropertis.windowMap.y * 5 : mapPropertis.mapObj.mapArray[mapPropertis.idexSelect][0].height * mapPropertis.windowMap.y;
        }
        myGameArea.context = myGameArea.canvas.getContext("2d");

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
        htmlObj.lvlSelect.val(mapPropertis.idexSelect + 2 >= $("select option").length ? 1 : mapPropertis.idexSelect + 2);
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
