let {KarelCodeManag, myConfig, htmlObj} = require("./storage")
let {Controls}=require("./control");
let {myGameArea} = require("./worldCanvas")
let {crashWith} = require("./Crash")
'use strict';

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
             if (myConfig.coin.height === 0) {
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
        switch (myConfig.levelTurn) {
            case 2:
                if (myConfig.myPlayr.y + myConfig.myPlayr.height === myGameArea.canvas.height) {
                    return true
                } else return false;
            case 1:
                if (myConfig.myPlayr.x === 0) {
                    return true
                } else return false;
            case 0:
                if (myConfig.myPlayr.y === 0) {
                    return true
                } else return false;
            case 3:
                if (myConfig.myPlayr.x + myConfig.myPlayr.width === myGameArea.canvas.width) {
                    return true
                } else return false

        }
        return false;

    },
};

let stepDisplay = () => {
    let saveX = myConfig.windowMap.x, saveY = myConfig.windowMap.y;
    htmlObj.KarolLoad.value = 0;
    htmlObj.KarolLoad.max = KarelCodeManag.stepKerrol.length;
    htmlObj.KarolLoad.low = KarelCodeManag.stepKerrol.length * 0.3;
    htmlObj.KarolLoad.high = KarelCodeManag.stepKerrol.length * 0.6;
    htmlObj.KarolLoad.optimum = KarelCodeManag.stepKerrol.length * 0.8;
    KarelCodeManag.timeset = 0;
    myConfig.myPlayr.x = 0;
    myConfig.myPlayr.y = 0;
    myConfig.levelTurn = 2;
    let windwoflag = true;
    console.log(KarelCodeManag.stepKerrol)
    KarelCodeManag.stepKerrol.forEach((item)=> {
        let gokarol = setTimeout(() => {
            if (saveX !== myConfig.windowMap.x && saveY !== myConfig.windowMap.y) {
                windwoflag = false;
                return;
            }
            if (!windwoflag) {
                clearInterval(gokarol);
                return;
            } else
                htmlObj.KarolLoad.value += 1;
            if (item.turn !== undefined) {
                myConfig.levelTurn = item.turn;
            } else if (item.x !== undefined) {
                myConfig.myPlayr.x = item.x;
                myConfig.myPlayr.y = item.y;
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

htmlObj.KarolSubmit.click(() => {
    myConfig.myPlayr.x = 0;
    myConfig.myPlayr.y = 0;
    myConfig.levelTurn = 2;
    let iterfase = $("#interface");
    KarelCodeManag.stepKerrol = [];
    iterfase.css("pointerEvents", "none");
    KarelCodeManag.error = 0;
    KarelCodeManag.timeflag = true;
    // KarelCodeManag.stepKerrol.push({turn: myConfig.levelTurn})
    // KarelCodeManag.stepKerrol.push({x: myConfig.myPlayr.x, y: myConfig.myPlayr.y})
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
});