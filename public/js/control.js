var trn = 2; // стартовое направление персонажа

//поворот персонажа
function turn() {
    trn++;
    if (trn == 1) myGamePiece.image.src = "/public/assets/karol_left.png";
    if (trn == 2) myGamePiece.image.src = "/public/assets/karol_down.png";
    if (trn == 3) myGamePiece.image.src = "/public/assets/karol_right.png";
    if (trn > 3) {
        trn = 0;
        myGamePiece.image.src = "/public/assets/karol_up.png";
    }
}

//движение персонажа
function move() {
    switch (trn) {
        case 0:
            myGamePiece.speedY = -30 // up
            break;
        case 2:
            myGamePiece.speedY = 30 // down
            break;
        case 1:
            myGamePiece.speedX = -30  // left
            break;
        case 3:
            myGamePiece.speedX = 30  // right
            break;
    }

}

//остановка персонажа
function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

// функцыя поднятия и вышвыривания монетки
function token() {
    var x = myGamePiece.x + (myGamePiece.width / 2)
    var y = myGamePiece.y + (myGamePiece.height / 2)

    if (coin.height == 0) {
        coin.x = myGamePiece.x;
        coin.y = myGamePiece.y;
        coin.height = 30;
        coin.width = 30;

    } else if (x >= coin.x && x <= coin.x + coin.width && y >= coin.y && y <= coin.y + coin.height) {
        trn = 2;
        myGamePiece.image.src = "/public/assets/karol.png";
        coin.height = 0;
        coin.width = 0;
    }
}