const {myGameArea} = require("./mapSeting");
const {myConfig} = require("./config");
const {wordlTask} = require("./worldgen");
const {turnImeg, lvltask} = require("./control");

console.log(myConfig,"render")
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
    if (wordlTask.type === "loot" && wordlTask.userstep === 0) {
        myGameArea.newlvl();
    }
    myConfig.myScore.text = "x:" + myConfig.myPlayr.x + " y:" + myConfig.myPlayr.y;
    turnImeg();
    myConfig.myPlayr.update(); // обновляем персонажа
    myConfig.myScore.update(); // обновляем отображение координат перемишения
    //myGameArea.newlvl();

}

module.exports.render = updateGameArea;
