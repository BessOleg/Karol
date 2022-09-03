//обект для взаимодействия передвижения передвижения
let KarelCodeManag = {
    timeset: 0, // буфер времени
    timestep: 500, // задержка в милисикундах
    timeflag: false, // флаг на время виполнения автокода
    error: 0, stepKerrol: []
}
//setTimeout(turn, KarelCodeManag.timeset);
//         if (KarelCodeManag.timeflag)
//             KarelCodeManag.timeset += KarelCodeManag.timestep;

// обектр робота для написания команд роботу
let karol = {
    //движение робота в перед
    go: () => {
        if (KarelCodeManag.error <= 3) {
            if (karol.chekWall() === true) {
                KarelCodeManag.error += 1;
            }
            console.log(KarelCodeManag.error)

            move();
        }
    }, //поворот робота в лево
    turnLeft: () => {
        if (KarelCodeManag.error <= 3) {
            turn();
        }
    }, // поднять монетку
    lift: () => {
        if (KarelCodeManag.error <= 3) {
            token();
            if(myConfig.coin.height===0){
                alert("You WIN! \n  You error: "+ KarelCodeManag.error)
            }
        }
    },

    // проверить на наличие барера
    chekWall: () => {
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
}

let stepDisplay = () => {
    KarelCodeManag.timeset = 0;
    myConfig.myPlayr.x = 0;
    myConfig.myPlayr.y = 0;
    myConfig.levelTurn = 2;
    KarelCodeManag.stepKerrol.forEach(function (item) {
        setTimeout(() => {
            if (item.turn !== undefined) {
                myConfig.levelTurn = item.turn;
            } else if (item.x !== undefined) {
                myConfig.myPlayr.x = item.x;
                myConfig.myPlayr.y = item.y;
            }
        }, KarelCodeManag.timeset += KarelCodeManag.timestep)
    });
};

// де йствие при клике по кнопке для запуска кода
$("#gocode").click(function () {
    let iterfase = $("#interface")[0]
    iterfase.style.pointerEvents = "none";
    KarelCodeManag.error = 0;
    KarelCodeManag.timeflag = true;
    //  KarelCodeManag.stepKerrol.push({turn: myConfig.levelTurn})
    // KarelCodeManag.stepKerrol.push({x: myConfig.myPlayr.x, y: myConfig.myPlayr.y})
    let code = $("textarea")[0].value;
    try {
        eval(code);// метод реализации из текста в код
        stepDisplay();
    } catch (e) {
        alert("Error:" + e);
    }
    if (KarelCodeManag.error > 3) {
        setTimeout(() => alert('Game Over. You error: ' + KarelCodeManag.error), KarelCodeManag.timeset += KarelCodeManag.timestep);
    }
    setTimeout(() => iterfase.style.pointerEvents = "", KarelCodeManag.timeset += KarelCodeManag.timestep);
    setTimeout(() => iterfase.style.pointerEvents = "", KarelCodeManag.timeset += KarelCodeManag.timestep);
    KarelCodeManag.timeflag = false;
    KarelCodeManag.timeset = 0;

});

