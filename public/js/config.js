const {myGameArea} = require("./mapSeting");
const {worldgen} = require("./worldgen");
//window.require = require;

'use strict';

let myConfig = {
    myPlayr: '', coin: '', myScore: '',//обекти игри
    windowMap: {x: '', y: ''},// розммери сетки
    wallMass: [], // масив стен и обектов
    mapObj: {mapArray: '', mapFlag: false},// получаемий файл с сервера
    lvlSelect: $("select"),
    idexSelect: $("select").val() - 1,
    FileLoad: $("#filegame"),
    startStop: $("#start"),
    boolstart: true,
    levelTurn: 2
};
module.exports.myConfig = myConfig;

myConfig.startStop.on("mousedown", () => {
    startGame();
    startGame();
});

// авто изменение окна карти
$(window).resize(() => {
    myWindowMap();
});

let myWindowMap = () => {
    myConfig.windowMap.x = Math.round((window.innerWidth / 320) * 20);
    myConfig.windowMap.y = Math.round((window.innerHeight / 480) * 35);
    //KarelCodeManag.stepKerrol=[];
    //worldgen();
    myGameArea.clear();
    myGameArea.stop();
    startGame();
};


window.onload = () => {
    selload().then(data => {
        myConfig.mapObj.mapArray = data;
        //console.log(myConfig)
        startGame();
    });
    myWindowMap();
};

// функция запроса обекта карти у сервера
let selload = () => {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/file');

        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
            //  console.log(reject);
        };
        // console.log(date)
        myConfig.startStop.removeAttr('disabled');
        xhr.send();
    });

}

myConfig.FileLoad.on('change', function () {
    let file = myConfig.FileLoad.files[0];
    console.log(myConfig.FileLoad.files[0]);
    let read = new FileReader();
    read.readAsText(file);
    read.onload = () => {
        myConfig.mapObj.mapArray = JSON.parse(read.result)
    };
    myConfig.mapObj.mapFlag = true;
    myConfig.startStop.removeAttribute('disabled');
    //startGame();
});


let startGame = () => {
    if (myConfig.boolstart) {
        myConfig.idexSelect = parseInt($("select").val()) - 1;
        worldgen();
        myGameArea.start();
    } else {
        myGameArea.stop();
        myGameArea.clear();
    }
};

module.exports.startGame = startGame;

let crashWith = () => {
    let myleft = myConfig.myPlayr.x;
    let myright = myConfig.myPlayr.x + (myConfig.myPlayr.width);
    let mytop = myConfig.myPlayr.y;
    let mybottom = myConfig.myPlayr.y + (myConfig.myPlayr.height);
    for (var i in myConfig.wallMass) {
        if (myConfig.wallMass[i].type !== "image" && myConfig.wallMass[i].type !== "font") {
            let otherleft = myConfig.wallMass[i].x;
            let otherright = myConfig.wallMass[i].x + myConfig.wallMass[i].width;
            let othertop = myConfig.wallMass[i].y;
            let otherbottom = myConfig.wallMass[i].y + myConfig.wallMass[i].height;
            var currentStep = 0;
            switch (myConfig.levelTurn) {
                case 0: { // up
                    if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mytop >= othertop && mytop <= otherbottom)) {
                        currentStep = 0;
                    } else currentStep = -myConfig.windowMap.y

                }
                    break;
                case 1: { // left
                    if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myleft >= otherleft && myleft <= otherright)) {
                        currentStep = 0;
                    } else currentStep = -myConfig.windowMap.x
                }
                    break;
                case 2: { // down
                    if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mybottom >= othertop && mybottom <= otherbottom)) {
                        currentStep = 0;
                    } else currentStep = myConfig.windowMap.y
                }
                    break;
                case 3: { // right
                    if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myright >= otherleft && myright <= otherright)) {
                        currentStep = 0;
                    } else currentStep = myConfig.windowMap.x
                }
                    break;
            }
            if (currentStep === 0) {
                return currentStep;
            }
        }
    }
    return currentStep;

};


//window.myConfig = myConfig;
module.exports.crashWith = crashWith;
//exports.myConfig = myConfig;

