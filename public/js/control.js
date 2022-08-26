

//поворот персонажа
//
function turn() {
        let playrTurn = {
            up: "/public/assets/karol_up.png",
            down: "/public/assets/karol_down.png",
            left: "/public/assets/karol_left.png",
            right: "/public/assets/karol_right.png"
        }
        myConfig.levelTurn++;
        if (myConfig.levelTurn === 1) myConfig.myPlayr.image.src = playrTurn.left
        if (myConfig.levelTurn === 2) myConfig.myPlayr.image.src = playrTurn.down
        if (myConfig.levelTurn === 3) myConfig.myPlayr.image.src = playrTurn.right
        if (myConfig.levelTurn > 3) {
            myConfig.levelTurn = 0;
            myConfig.myPlayr.image.src = playrTurn.up;
        }

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
function token() {
    let x = myConfig.myPlayr.x + (myConfig.myPlayr.width / 2)
    let y = myConfig.myPlayr.y + (myConfig.myPlayr.height / 2)

    if (myConfig.coin.height === 0) {
        myConfig.coin.x = myConfig.myPlayr.x;
        myConfig.coin.y = myConfig.myPlayr.y;
        myConfig.coin.height = myConfig.windowMap.y;
        myConfig.coin.width = myConfig.windowMap.x;

    } else if (x >= myConfig.coin.x && x <= myConfig.coin.x + myConfig.coin.width && y >= myConfig.coin.y && y <= myConfig.coin.y + myConfig.coin.height) {
        myConfig.levelTurn = 2;
       // myConfig.myPlayr.image.src = "/public/assets/karol.png";
        myConfig.coin.height = 0;
        myConfig.coin.width = 0;
        setTimeout(myGameArea.newlvl, 3000);
        // myGameArea.newlvl()

    }
}