let trn = 2; // стартовое направление персонажа

//поворот персонажа
//
function turn() {
    setTimeout(() => {
        trn++;
        if (trn === 1) myGamePiece.image.src = "/public/assets/karol_left.png";
        if (trn === 2) myGamePiece.image.src = "/public/assets/karol_down.png";
        if (trn === 3) myGamePiece.image.src = "/public/assets/karol_right.png";
        if (trn > 3) {
            trn = 0;
            myGamePiece.image.src = "/public/assets/karol_up.png";
        }
    }, timeset);
    if (timeflag)
        timeset += timestep;

}

//движение персонажа
function move() {
    setTimeout(() => {
        switch (trn) {
            case 0:
                myGamePiece.speedY = -shagY // up
                break;
            case 2:
                myGamePiece.speedY = shagY // down
                break;
            case 1:
                myGamePiece.speedX = -shagX  // left
                break;
            case 3:
                myGamePiece.speedX = shagX  // right
                break;
        }
        myGamePiece.newPos();
        clearmove();
    }, timeset)
    if (timeflag)
        timeset += timestep;
}

//остановка персонажа
function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

// функцыя поднятия и вышвыривания монетки
function token() {
    let x = myGamePiece.x + (myGamePiece.width / 2)
    let y = myGamePiece.y + (myGamePiece.height / 2)

    if (coin.height === 0) {
        coin.x = myGamePiece.x;
        coin.y = myGamePiece.y;
        coin.height = shagY;
        coin.width = shagX;

    } else if (x >= coin.x && x <= coin.x + coin.width && y >= coin.y && y <= coin.y + coin.height) {
        trn = 2;
        myGamePiece.image.src = "/public/assets/karol.png";
        coin.height = 0;
        coin.width = 0;
        setTimeout(myGameArea.newlvl, 3000);
        // myGameArea.newlvl()

    }
}