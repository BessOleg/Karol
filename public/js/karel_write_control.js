//обект для взаимодействия передвижения передвижения
let KarelCodeManag = {
    timeset: 0, // буфер времени
    timestep: 200, // задержка в милисикундах
    timeflag: false, // флаг на время виполнения автокода
    error: 0, stepKerrol: []
}

// object of robot commands
let karol = {
    //moving forward
    go: () => {
        if (KarelCodeManag.error <= 3) {
            if (karol.checkWall() === true) {
                KarelCodeManag.error += 1;
            }
            // console.log(KarelCodeManag.error)
            move();
        }
    },
    turnLeft: () => {
        if (KarelCodeManag.error <= 3) {
            turn();
        }
    }, // lift coin
    putCoin: () => {
        KarelCodeManag.stepKerrol.push({token: "down"})
    },
    flipCoin: () => {
        KarelCodeManag.stepKerrol.push({token: "up"})
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
    checkCoin:()=> checkToken("image"),
    checkTabCoin:()=> checkToken("font")
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
                } else return false
            case 1:
                if (myConfig.myPlayr.x === 0) {
                    return true
                } else return false
            case 0:
                if (myConfig.myPlayr.y === 0) {
                    return true
                } else return false
            case 3:
                if (myConfig.myPlayr.x + myConfig.myPlayr.width === myGameArea.canvas.width) {
                    return true
                } else return false

        }
        return false;

    },
};
var KarolLoad = $("#loading")[0];
let stepDisplay = () => {
    var saveX = myConfig.windowMap.x, saveY = myConfig.windowMap.y;
    KarolLoad.value = 0;
    KarolLoad.max = KarelCodeManag.stepKerrol.length;
    KarolLoad.low = KarelCodeManag.stepKerrol.length * 0.3;
    KarolLoad.high = KarelCodeManag.stepKerrol.length * 0.6;
    KarolLoad.optimum = KarelCodeManag.stepKerrol.length * 0.8;
    KarelCodeManag.timeset = 0;
    myConfig.myPlayr.x = 0;
    myConfig.myPlayr.y = 0;
    myConfig.levelTurn = 2;
    var windwoflag = true;
    KarelCodeManag.stepKerrol.forEach(function (item) {
        var gokarol = setTimeout(() => {
            if (saveX !== myConfig.windowMap.x && saveY !== myConfig.windowMap.y) {
                windwoflag = false;
                return;
            }
            if (!windwoflag) {
                clearInterval(gokarol);
                return;
            } else
                KarolLoad.value += 1;
            if (item.turn !== undefined) {
                myConfig.levelTurn = item.turn;
            } else if (item.x !== undefined) {
                myConfig.myPlayr.x = item.x;
                myConfig.myPlayr.y = item.y;
            } else if (item.token) {
                if (item.token === "up" && checkToken() === true) token();
                if (item.token === "down" && checkToken() === false) token();
            }
        }, KarelCodeManag.timeset += KarelCodeManag.timestep)
    });
};

// action when clicking on the button to run the code
$("#gocode").click(function () {
    myConfig.myPlayr.x = 0;
    myConfig.myPlayr.y = 0;
    myConfig.levelTurn = 2;
    let iterfase = $("#interface")
    KarelCodeManag.stepKerrol = [];
    iterfase.css("pointerEvents", "none");
    KarelCodeManag.error = 0;
    KarelCodeManag.timeflag = true;
    // KarelCodeManag.stepKerrol.push({turn: myConfig.levelTurn})
    // KarelCodeManag.stepKerrol.push({x: myConfig.myPlayr.x, y: myConfig.myPlayr.y})
    let code = $("textarea").val()
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

