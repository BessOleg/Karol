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
var chekToken = () => {
    var cheket = false;
    myConfig.wallMass.forEach(item => {
        if (item.type === "image" && item.x === myConfig.myPlayr.x && item.y === myConfig.myPlayr.y) {
            cheket = true;
            return;
        }
    });
    return cheket;
};

function token() {
    if (!chekToken()) {
        myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", myConfig.myPlayr.x, myConfig.myPlayr.y, "image"));
    } else {
        myConfig.wallMass.splice(searchElement(), 1);
    }
}

var searchElement = () => {
    var ind;
    myConfig.wallMass.forEach((item, index) => {
        if (item.type === "image" && item.x === myConfig.myPlayr.x && item.y === myConfig.myPlayr.y) {
            return ind = index;
        }
    });
    return ind;
};