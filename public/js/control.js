const {myConfig} = require("./config");
const {component} = require("./entity");
//поворот персонажа
//
console.log(myConfig,"control")
$("#go").click(()=> move());
$("#turn").click(()=>turn());
$("#token").click(()=>token());

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
} exports.turnImeg = turnImeg;


//движение персонажа
function move() {
    switch (myConfig.levelTurn) {
        case 0:
            myConfig.myPlayr.speedY = -myConfig.windowMap.y// up
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
    if(searchElement("image")!==false)
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
};module.exports.lvltask = lvltask;