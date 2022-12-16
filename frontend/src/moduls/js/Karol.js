'use strict';
let {KarelCodeManag, mapPropertis, htmlObj} = require("./storage");
let {Controls} = require("./control");
let {myGameArea} = require("./worldCanvas");
let {crashWith} = require("./Crash");
let $ = require("jquery")
//jquery add
let karol = {
    //moving forward
    go: () => {
        if (KarelCodeManag.error <= 3) {
            if (karol.checkWall() === true) {
                KarelCodeManag.error += 1;
            }
            // console.log(KarelCodeManag.error)
            Controls.move();
        }
    },
    turnLeft: () => {
        if (KarelCodeManag.error <= 3) {
            Controls.turn();
        }
    }, // lift coin
    putCoin: () => {
        if (KarelCodeManag.error <= 3) {
            KarelCodeManag.stepKerrol.push({token: "down"})
        }
    },
    flipCoin: () => {
        if (KarelCodeManag.error <= 3) {
            KarelCodeManag.stepKerrol.push({token: "up"})
        }
        /* if (KarelCodeManag.error <= 3) {
             token();
             if (mapPropertis.coin.height === 0) {
                 alert("You WIN! \n  You error: " + KarelCodeManag.error)
             } else {
                 //  alert("not my mony!")
                 return false;
             }
         }*/
    },
    checkCoin: () => Controls.checkToken("image"),
    checkTabCoin: () => Controls.checkToken("font")
    ,
    // check object
    checkWall: () => {
        if (crashWith() === 0) {
            return true
        }
        switch (mapPropertis.levelTurn) {
            case 2:
                if (mapPropertis.myPlayr.y + mapPropertis.myPlayr.height === myGameArea.canvas.height) {
                    return true
                } else return false;
            case 1:
                if (mapPropertis.myPlayr.x === 0) {
                    return true
                } else return false;
            case 0:
                if (mapPropertis.myPlayr.y === 0) {
                    return true
                } else return false;
            case 3:
                if (mapPropertis.myPlayr.x + mapPropertis.myPlayr.width === myGameArea.canvas.width) {
                    return true
                } else return false

        }
        return false;

    },
};

let stepDisplay = () => {
    let saveX = mapPropertis.windowMap.x, saveY = mapPropertis.windowMap.y;
    htmlObj.KarolLoad.value = 0;
    htmlObj.KarolLoad.max = KarelCodeManag.stepKerrol.length;
    htmlObj.KarolLoad.low = KarelCodeManag.stepKerrol.length * 0.3;
    htmlObj.KarolLoad.high = KarelCodeManag.stepKerrol.length * 0.6;
    htmlObj.KarolLoad.optimum = KarelCodeManag.stepKerrol.length * 0.8;
    KarelCodeManag.timeset = 0;
    mapPropertis.myPlayr.x = 0;
    mapPropertis.myPlayr.y = 0;
    mapPropertis.levelTurn = 2;
    let windwoflag = true;
    console.log(KarelCodeManag.stepKerrol)
    KarelCodeManag.stepKerrol.forEach((item) => {
        let gokarol = setTimeout(() => {
            if (saveX !== mapPropertis.windowMap.x && saveY !== mapPropertis.windowMap.y) {
                windwoflag = false;
                return;
            }
            if (!windwoflag) {
                clearInterval(gokarol);
                return;
            } else
                htmlObj.KarolLoad.value += 1;
            if (item.turn !== undefined) {
                mapPropertis.levelTurn = item.turn;
            } else if (item.x !== undefined) {
                mapPropertis.myPlayr.x = item.x;
                mapPropertis.myPlayr.y = item.y;
            } else if (item.token) {
                if (item.token === "up") {
                    Controls.upToken()
                }
                if (item.token === "down") {
                    Controls.downToken()
                }

            }
        }, KarelCodeManag.timeset += KarelCodeManag.timestep)
    });
};

var CodeKarol=() => {
    mapPropertis.myPlayr.x = 0;
    mapPropertis.myPlayr.y = 0;
    mapPropertis.levelTurn = 2;
    let iterfase = $("#interface");
    KarelCodeManag.stepKerrol = [];
    iterfase.css("pointerEvents", "none");
    KarelCodeManag.error = 0;
    KarelCodeManag.timeflag = true;
    // KarelCodeManag.stepKerrol.push({turn: mapPropertis.levelTurn})
    // KarelCodeManag.stepKerrol.push({x: mapPropertis.myPlayr.x, y: mapPropertis.myPlayr.y})
    let code = $("textarea").val();
    try {
        eval(code);// метод реализации из текста в код
        stepDisplay();
    } catch (e) {
        alert("Error:" + e);
    }
    if (KarelCodeManag.error > 3) {
        setTimeout(() => alert('Game Over. You error: ' + KarelCodeManag.error), KarelCodeManag.timeset += KarelCodeManag.timestep);
    }
    setTimeout(() => iterfase.css("pointerEvents", ""), KarelCodeManag.timeset += KarelCodeManag.timestep);
    // setTimeout(() => iterfase.style.pointerEvents = "", KarelCodeManag.timeset += KarelCodeManag.timestep);
    KarelCodeManag.timeflag = false;
    KarelCodeManag.timeset = 0;
};
module.exports.codeKarol = CodeKarol;
