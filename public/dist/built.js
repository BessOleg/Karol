var $ = require("jquery");

$("#go").click(()=> move());
$("#turn").click(()=>turn());
$("#token").click(()=>token());




var myConfig = {
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

myConfig.startStop.on("mousedown", () => {
    startGame();
    startGame();
});

// авто изменение окна карти
$(window).resize(() => {
    myWindowMap();
});

myWindowMap = () => {
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
        startGame();
    });
    myWindowMap();
};

// функция запроса обекта карти у сервера
function selload() {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/file');

        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
            //  console.log(reject);
        }
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


function startGame() {
    if (myConfig.boolstart) {
        myConfig.idexSelect = parseInt($("select").val()) - 1;
        worldgen();
        myGameArea.start();

    } else {
        myGameArea.stop();
        myGameArea.clear();

    }


}

var crashWith = () => {
    let myleft = myConfig.myPlayr.x;
    let myright = myConfig.myPlayr.x + (myConfig.myPlayr.width);
    let mytop = myConfig.myPlayr.y;
    let mybottom = myConfig.myPlayr.y + (myConfig.myPlayr.height);
    for (var i in myConfig.wallMass) {
        if (myConfig.wallMass[i].type !== "image"&&myConfig.wallMass[i].type !== "font") {
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



;
//поворот персонажа
//
let playrTurn = {
    up: 'assets/karol_up.png',
    down: "assets/karol_down.png",
    left: "assets/karol_left.png",
    right: "assets/karol_right.png"
};

function turn() {
    myConfig.levelTurn++;
    if (myConfig.levelTurn > 3) {
        myConfig.levelTurn = 0;
    }
    if (KarelCodeManag.timeflag) {
        KarelCodeManag.stepKerrol.push({turn: myConfig.levelTurn});
    }
}

function turnImeg() {
    if (myConfig.levelTurn === 1) myConfig.myPlayr.image.src = playrTurn.left
    if (myConfig.levelTurn === 2) myConfig.myPlayr.image.src = playrTurn.down
    if (myConfig.levelTurn === 3) myConfig.myPlayr.image.src = playrTurn.right
    if (myConfig.levelTurn === 0) myConfig.myPlayr.image.src = playrTurn.up;
    // myConfig.levelTurn = 0;


}


//движение персонажа
function move() {
    switch (myConfig.levelTurn) {
        case 0:
            myConfig.myPlayr.speedY = -myConfig.windowMap.y // up
            break;
        case 2:
            myConfig.myPlayr.speedY = myConfig.windowMap.y // down
            break;
        case 1:
            myConfig.myPlayr.speedX = -myConfig.windowMap.x  // left
            break;
        case 3:
            myConfig.myPlayr.speedX = myConfig.windowMap.x  // right
            break;
    }
    myConfig.myPlayr.newPos();
    clearmove();
}

//остановка персонажа
function clearmove() {
    myConfig.myPlayr.speedX = 0;
    myConfig.myPlayr.speedY = 0;
}

// функцыя поднятия и вышвыривания монетки
var checkToken = (search) => {
    var checket = false;
    myConfig.wallMass.forEach(item => {
        if (item.type === search && item.x === myConfig.myPlayr.x && item.y === myConfig.myPlayr.y) {
            checket = true;
            return checket;
        }
    });
    return checket;
};

function token() {
    if (!checkToken("image")) {
        myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", myConfig.myPlayr.x, myConfig.myPlayr.y, "image"));
    } else {
        myConfig.wallMass.splice(searchElement("image"), 1);
    }
}

var downToken = () => {
    if (!checkToken("image")) {
        myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", myConfig.myPlayr.x, myConfig.myPlayr.y, "image"));
    }
};
var upToken = () => {
    if(searchElement("image")!=false)
    {myConfig.wallMass.splice(searchElement("image"), 1);}
}

var searchElement = (search) => {
    var ind = false;
    myConfig.wallMass.forEach((item, index) => {
        if (item.type === search && item.x === myConfig.myPlayr.x && item.y === myConfig.myPlayr.y) {
            return ind = index;
        }
    });
    return ind;
};

function lvltask() {
    var index = 0;
    for (key in myConfig.wallMass) {
        if (myConfig.wallMass[key].type === "font") {
            for (item in myConfig.wallMass) {
                if (myConfig.wallMass[item].type === "image") {
                    if (myConfig.wallMass[key].x === myConfig.wallMass[item].x && myConfig.wallMass[key].y === myConfig.wallMass[item].y) {
                        index += 1;
                    }
                }
            }
        }
    }
    wordlTask.userstep = index;
};
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    if (this.type === "image") {
        this.image = new Image();
        this.image.src = color;
    }

    this.update = function () {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.globalAlpha = 1; // прозрачность

        if (this.type === "text") {
            ctx.globalAlpha = 0.3;
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }

        if (this.type === "cube") {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.type === "font") {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (type === "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    }


    this.newPos = function () {
        if (myConfig.wallMass.length > 0) {
            if (this.speedX !== 0) {
                //console.log("crashX")
                this.x += crashWith();
            }
            if (this.speedY !== 0) {
                //  console.log("crashY")
                this.y += crashWith();
            }
        } else {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > myGameArea.canvas.height) this.y = myGameArea.canvas.height - this.height;
        if (KarelCodeManag.timeflag) {
            KarelCodeManag.stepKerrol.push({x: this.x, y: this.y});
        }
    }
}


;//обект для взаимодействия передвижения передвижения
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
    checkCoin: () => checkToken("image"),
    checkTabCoin: () => checkToken("font")
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
                if (item.token === "up") {
                    upToken()
                }
                ;
                if (item.token === "down") {
                    downToken()
                }
                ;

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

;// конфигы и загрузка мапи
var myGameArea = {
    canvas: $("#Canvas")[0],
    start: function () {

        if (myConfig.mapObj.mapFlag === true) {
            console.log("client");
            this.canvas.width = myConfig.mapObj.mapArray === undefined ? myConfig.windowMap.x * 5 : myConfig.mapObj.mapArray[0].width + myConfig.mapObj.mapArray[0].width % myConfig.windowMap.x;
            this.canvas.height = myConfig.mapObj.mapArray === undefined ? myConfig.windowMap.y * 5 : myConfig.mapObj.mapArray[0].height + myConfig.mapObj.mapArray[0].height % myConfig.windowMap.y;

        } else {
            console.log("server");
            this.canvas.width = myConfig.idexSelect >= 2 ? myConfig.windowMap.x * 5 : myConfig.mapObj.mapArray[myConfig.idexSelect][0].width * myConfig.windowMap.x;
            this.canvas.height = myConfig.idexSelect >= 2 ? myConfig.windowMap.y * 5 : myConfig.mapObj.mapArray[myConfig.idexSelect][0].height * myConfig.windowMap.y;

        }
        this.context = this.canvas.getContext("2d");
        //console.log(this.context===)
        this.interval = setInterval(updateGameArea, 30);

        myConfig.boolstart = false;
        myConfig.startStop.innerText = "stop";
    }, clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, stop: function () {

        myConfig.wallMass = [];
        myConfig.boolstart = true;
        myConfig.levelTurn = 2;
        myConfig.startStop.attr("disabled", true);
        if (myConfig.mapObj.mapFlag) {
            myConfig.mapObj.mapFlag = false;
        }
        myConfig.startStop.removeAttr('disabled');
        //selload();
        myConfig.startStop.innerText = "start";
        clearInterval(this.interval);

    }, newlvl: function () {
        alert("You WIN! \n  You error: " + KarelCodeManag.error)
        //let next = myConfig.idexSelect+2 > $("select option").length ? 0 :  myConfig.idexSelect+2
        myConfig.lvlSelect.val(myConfig.idexSelect + 2 >= $("select option").length ? 1 : myConfig.idexSelect + 2);
        startGame();
        startGame();
    }
    , netupdate: function () {
        this.context.strokeStyle = "rgba(16,206,202,0.56)";
        this.context.beginPath();

        for (var x = 0; x < this.canvas.width; x += myConfig.windowMap.x) {

            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);

        }

        for (var y = 0; y < this.canvas.height; y += myConfig.windowMap.y) {

            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);


        }
        this.context.stroke();

    }
}
;

function updateGameArea() {

    myGameArea.clear(); // чистим поле
    myGameArea.netupdate();// обновляем сетку
    if (myConfig.wallMass.length > 0) // обновляем все елементы если они есть
        for (i in myConfig.wallMass) {
            myConfig.wallMass[i].update()
        }
    // перемишеие персонажа
    // myConfig.coin.update(); // обновляем монетку
    lvltask();
    if (wordlTask.type === "dispense" && wordlTask.userstep === wordlTask.condition) {
        myGameArea.newlvl();
    }
    if(wordlTask.type=== "loot" && wordlTask.userstep === 0){
        myGameArea.newlvl();
    }
    myConfig.myScore.text = "x:" + myConfig.myPlayr.x + " y:" + myConfig.myPlayr.y;
    turnImeg();
    myConfig.myPlayr.update(); // обновляем персонажа
    myConfig.myScore.update(); // обновляем отображение координат перемишения
    //myGameArea.newlvl();

}
;

//загрузка элементов мира
var wordlTask = {
    condition: "",// количестов
    type: "",// тип задания
    userstep:0
};

function worldgen() {
    if (myConfig.mapObj.mapFlag === true) {
        maps(myConfig.mapObj.mapArray);
    } else {
        maps(myConfig.mapObj.mapArray[myConfig.idexSelect]);
    }

}

function maps(map) {
    myConfig.myPlayr = new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/karol.png", 0, 0, "image");
    myConfig.myScore = new component("15px", "Consolas", "black", 60, 30, "text");
    //myConfig.coin = new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", 0, 0, "image");
    generation(map);


}

function generation(files) {
    if (files)
        for (i in files) {
            // тут підгрузка  рівня та його вимог буде!
            if (files[i].name) {
                $("details p").remove()
                var info = $("#lvlInfo");
                for (key in files[i]) {
                    var textlvl = '';
                    switch (key) {
                        case"name":
                            textlvl = "Namelvl: " + files[i][key];
                            $("select option:selected").text(files[i][key]);
                            break;
                        case"task":
                            wordlTask.condition = files[i][key];
                            textlvl = "Task for lvl: " + files[i][key];
                            break;
                        case"typeTask":
                            wordlTask.type = files[i][key];
                            textlvl = "Type Task: " + files[i][key];
                            break;
                        case"info":
                            textlvl = "Info for lvl: " + files[i][key];
                            break;
                    }
                    info.append($("<p>", {text: textlvl}))
                }
            }
            if (files[i].type === "cube") {
                myConfig.wallMass.push(new component(
                    files[i].width === 0 ? 2 : files[i].width * myConfig.windowMap.x,
                    files[i].height === 0 ? 2 : files[i].height * myConfig.windowMap.y,
                    files[i].color, files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, files[i].type));
            }
            if (files[i].type === "image" && wordlTask.type === "loot") {
                // изменить генерацию монет
                myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "rgba(67,169,61,0.15)", files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, "font"));
                myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, "image"));
            }
            if (files[i].type === "image" && wordlTask.type === "dispense") {
                // изменить генерацию монет
                myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "rgba(67,169,61,0.15)", files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, "font"));
              //  myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, "image"));
            }
        }
}


