let {myConfig,playrTurn,wordlTask} = require("./storage")
'use strict';

let updateGameArea = (world) => {
    world.clear(); // чистим поле
    world.netupdate();// обновляем сетку
    if (myConfig.wallMass.length > 0) // обновляем все елементы если они есть
        for (let i in myConfig.wallMass) {
            myConfig.wallMass[i].update()
        }
    lvltask();
    if (wordlTask.type === "dispense" && wordlTask.userstep === wordlTask.condition) {
        world.newlvl();
    }
    if (wordlTask.type === "loot" && wordlTask.userstep === 0) {
        world.newlvl();
    }
    myConfig.myScore.text = "x:" + myConfig.myPlayr.x + " y:" + myConfig.myPlayr.y;
    turnImeg();
    myConfig.myPlayr.update(); // обновляем персонажа
    myConfig.myScore.update(); // обновляем отображение координат перемишения
};


let lvltask = () => {
    let index = 0;
    for (let key in myConfig.wallMass) {
        if (myConfig.wallMass[key].type === "font") {
            for (let item in myConfig.wallMass) {
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

let turnImeg = () => {
    if (myConfig.levelTurn === 1) myConfig.myPlayr.image.src = playrTurn.left;
    if (myConfig.levelTurn === 2) myConfig.myPlayr.image.src = playrTurn.down;
    if (myConfig.levelTurn === 3) myConfig.myPlayr.image.src = playrTurn.right;
    if (myConfig.levelTurn === 0) myConfig.myPlayr.image.src = playrTurn.up;
    // myConfig.levelTurn = 0;
};

module.exports.render = updateGameArea;