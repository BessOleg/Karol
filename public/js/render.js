function updateGameArea() {

    myGameArea.clear(); // чистим поле
    myGameArea.netupdate();// обновляем сетку
    if (bray.length > 0) // обновляем все елементы если они есть
        for (var i in bray) {
            bray[i].update()
        }
     // перемишеие персонажа
    coin.update(); // обновляем монетку

    myScore.text = "x:" + myGamePiece.x + " y:" + myGamePiece.y;

    myGamePiece.update(); // обновляем персонажа
    console.log(myGamePiece.x," ",myGamePiece.y)
    myScore.update(); // обновляем отображение координат перемишения


}