function updateGameArea() {

    myGameArea.clear(); // чистим поле
    myGameArea.netupdate();// обновляем сетку
    if (myConfig.wallMass.length > 0) // обновляем все елементы если они есть
        for (var i in myConfig.wallMass) {
            myConfig.wallMass[i].update()
        }
    // перемишеие персонажа
    myConfig.coin.update(); // обновляем монетку

    myConfig.myScore.text = "x:" + myConfig.myPlayr.x + " y:" + myConfig.myPlayr.y;
    turnImeg();
    myConfig.myPlayr.update(); // обновляем персонажа
    myConfig.myScore.update(); // обновляем отображение координат перемишения


}