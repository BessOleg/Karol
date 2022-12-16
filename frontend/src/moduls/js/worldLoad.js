'use strict';
let {mapPropertis, wordlTask, playrTurn} = require("./storage");
let {component} = require("./entity");
let $ = require("jquery");
let coinIm =require("../assets/coin.png")
//jquery add


let worldgen = () => {

    //console.log(component())
    if (mapPropertis.mapObj.mapFlag === true) {
        maps(mapPropertis.mapObj.mapArray, mapPropertis);
    } else {
        maps(mapPropertis.mapObj.mapArray[mapPropertis.idexSelect], mapPropertis);
    }
};

let maps = (map) => {
    // console.log(mapPropertis);
    mapPropertis.myPlayr = new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, playrTurn.down, 0, 0, "image");
    mapPropertis.myScore = new component("15px", "Consolas", "black", 60, 30, "text");
    //mapPropertis.coin = new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, "assets/coin.png", 0, 0, "image");
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
                mapPropertis.wallMass.push(new component(
                    files[i].width === 0 ? 2 : files[i].width * mapPropertis.windowMap.x,
                    files[i].height === 0 ? 2 : files[i].height * mapPropertis.windowMap.y,
                    files[i].color, files[i].x * mapPropertis.windowMap.x, files[i].y * mapPropertis.windowMap.y, files[i].type));
            }
            if (files[i].type === "image" && wordlTask.type === "loot") {
                // изменить генерацию монет
                mapPropertis.wallMass.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, "rgba(67,169,61,0.15)", files[i].x * mapPropertis.windowMap.x, files[i].y * mapPropertis.windowMap.y, "font"));
                mapPropertis.wallMass.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, coinIm, files[i].x * mapPropertis.windowMap.x, files[i].y * mapPropertis.windowMap.y, "image"));
            }
            if (files[i].type === "image" && wordlTask.type === "dispense") {
                // изменить генерацию монет
                mapPropertis.wallMass.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, "rgba(67,169,61,0.15)", files[i].x * mapPropertis.windowMap.x, files[i].y * mapPropertis.windowMap.y, "font"));
                //  mapPropertis.wallMass.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, "assets/coin.png", files[i].x * mapPropertis.windowMap.x, files[i].y * mapPropertis.windowMap.y, "image"));
            }
        }
    // /console.log(mapPropertis)
};

module.exports.worldgen = worldgen;
