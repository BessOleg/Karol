let {myConfig, htmlObj,KarelCodeManag} = require("./storage");
let {render} = require("./render");
let {worldgen} = require("./worldLoad");
'use strict';


let myGameArea = {
    canvas: $("#Canvas")[0],
    myWindowMap: () => {
        myConfig.windowMap.x = Math.round((window.innerWidth / 320) * 20);
        myConfig.windowMap.y = Math.round((window.innerHeight / 480) * 35);
        //KarelCodeManag.stepKerrol=[];
        //worldgen();
        myGameArea.clear();
        myGameArea.stop();
        startGame();
    },
    start: () => {


        if (myConfig.mapObj.mapFlag === false) {
            console.log("server");
            myGameArea.canvas.width = myConfig.idexSelect >= 2 ? myConfig.windowMap.x * 5 : myConfig.mapObj.mapArray[myConfig.idexSelect][0].width * myConfig.windowMap.x;
            myGameArea.canvas.height = myConfig.idexSelect >= 2 ? myConfig.windowMap.y * 5 : myConfig.mapObj.mapArray[myConfig.idexSelect][0].height * myConfig.windowMap.y;
        }
        myGameArea.context = myGameArea.canvas.getContext("2d");

        myGameArea.interval = setInterval(()=>render(myGameArea), 30);

        myConfig.boolstart = false;
        htmlObj.restart.innerText = "stop";
    }, clear: () => {
        myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    }, stop: () => {
        myConfig.wallMass = [];
        myConfig.boolstart = true;
        myConfig.levelTurn = 2;
        htmlObj.restart.attr("disabled", true);
        if (myConfig.mapObj.mapFlag) {
            myConfig.mapObj.mapFlag = false;
        }
        htmlObj.restart.removeAttr('disabled');
        htmlObj.restart.innerText = "start";
        clearInterval(this.interval);

    }, newlvl: () => {
        alert("You WIN! \n  You error: " + KarelCodeManag.error);
        htmlObj.lvlSelect.val(myConfig.idexSelect + 2 >= $("select option").length ? 1 : myConfig.idexSelect + 2);
        startGame();
        startGame();
    }
    , netupdate: () => {
        myGameArea.context.strokeStyle = "rgba(16,206,202,0.56)";
        myGameArea.context.beginPath();
        for (var x = 0; x < myGameArea.canvas.width; x += myConfig.windowMap.x) {
            myGameArea.context.moveTo(x, 0);
            myGameArea.context.lineTo(x, myGameArea.canvas.height);
        }
        for (var y = 0; y < myGameArea.canvas.height; y += myConfig.windowMap.y) {
            myGameArea.context.moveTo(0, y);
            myGameArea.context.lineTo(myGameArea.canvas.width, y);
        }
        myGameArea.context.stroke();
    }

};
let startGame = () => {
    if (myConfig.boolstart) {
        myConfig.idexSelect = parseInt($("select").val()) - 1;
        worldgen();
        console.log(myConfig);
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