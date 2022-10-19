'use strict';
let {myConfig, wordlTask, playrTurn} = require("./storage");
let {component} = require("./entity");



let worldgen = () => {

    //console.log(component())
    if (myConfig.mapObj.mapFlag === true) {
        maps(myConfig.mapObj.mapArray, myConfig);
    } else {
        maps(myConfig.mapObj.mapArray[myConfig.idexSelect], myConfig);
    }
};

let maps = (map) => {
    // console.log(myConfig);
    myConfig.myPlayr = new component(myConfig.windowMap.x, myConfig.windowMap.y, playrTurn.down, 0, 0, "image");
    myConfig.myScore = new component("15px", "Consolas", "black", 60, 30, "text");
    //myConfig.coin = new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", 0, 0, "image");
    generation(map);
};

let generation = (files) => {
    if (files)
        for (let i in files) {
            // тут підгрузка  рівня та його вимог буде!
            if (files[i].name) {
                $("details p").remove();
                var info = $("#lvlInfo");
                for (let key in files[i]) {
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
    // /console.log(myConfig)
};

module.exports.worldgen = worldgen;