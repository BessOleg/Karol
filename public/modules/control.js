'use strict';
let {component} = require("./entity");
let {mapPropertis, KarelCodeManag} = require("./storage");


let Controls = {
    move: () => {
        switch (mapPropertis.levelTurn) {
            case 0:
                mapPropertis.myPlayr.speedY = -mapPropertis.windowMap.y;// up
                break;
            case 2:
                mapPropertis.myPlayr.speedY = mapPropertis.windowMap.y;// down
                break;
            case 1:
                mapPropertis.myPlayr.speedX = -mapPropertis.windowMap.x;// left
                break;
            case 3:
                mapPropertis.myPlayr.speedX = mapPropertis.windowMap.x; // right
                break;
        }
        mapPropertis.myPlayr.newPos();
        Controls.clearmove();
    }, turn: () => {
        mapPropertis.levelTurn++;
        if (mapPropertis.levelTurn > 3) {
            mapPropertis.levelTurn = 0;
        }
        if (KarelCodeManag.timeflag) {
            KarelCodeManag.stepKerrol.push({turn: mapPropertis.levelTurn});
        }
    }, clearmove: () => {
        mapPropertis.myPlayr.speedX = 0;
        mapPropertis.myPlayr.speedY = 0;
    }, checkToken: (search) => {
        let checket = false;
        mapPropertis.wallMass.forEach(item => {
            if (item.type === search && item.x === mapPropertis.myPlayr.x && item.y === mapPropertis.myPlayr.y) {
                checket = true;
                return checket;
            }
        });
        return checket;
    }, token: () => {
        if (!Controls.checkToken("image")) {
            mapPropertis.wallMass.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, "assets/coin.png", mapPropertis.myPlayr.x, mapPropertis.myPlayr.y, "image"));
        } else {
            mapPropertis.wallMass.splice(Controls.searchElement("image"), 1);
        }
    }, downToken: () => {
        if (!Controls.checkToken("image")) {
            mapPropertis.wallMass.push(new component(mapPropertis.windowMap.x, mapPropertis.windowMap.y, "assets/coin.png", mapPropertis.myPlayr.x, mapPropertis.myPlayr.y, "image"));
        }
    }, upToken: () => {
        if (Controls.searchElement("image") !== false) {
            mapPropertis.wallMass.splice(Controls.searchElement("image"), 1);
        }
    }, searchElement: (search) => {
        let ind = false;
        mapPropertis.wallMass.forEach((item, index) => {
            if (item.type === search && item.x === mapPropertis.myPlayr.x && item.y === mapPropertis.myPlayr.y) {
                return ind = index;
            }
        });
        return ind;
    }
};
module.exports.Controls = Controls;
