let {component} = require("./entity");
let {myConfig,KarelCodeManag}=require("./storage")
'use strict';


let Controls = {
    move: () => {
        switch (myConfig.levelTurn) {
            case 0:
                myConfig.myPlayr.speedY = -myConfig.windowMap.y;// up
                break;
            case 2:
                myConfig.myPlayr.speedY = myConfig.windowMap.y;// down
                break;
            case 1:
                myConfig.myPlayr.speedX = -myConfig.windowMap.x;// left
                break;
            case 3:
                myConfig.myPlayr.speedX = myConfig.windowMap.x; // right
                break;
        }
        myConfig.myPlayr.newPos();
        Controls.clearmove();
    },
    turn: () => {
        myConfig.levelTurn++;
        if (myConfig.levelTurn > 3) {
            myConfig.levelTurn = 0;
        }
        if (KarelCodeManag.timeflag) {
            KarelCodeManag.stepKerrol.push({turn: myConfig.levelTurn});
        }
    },
    clearmove: () => {
        myConfig.myPlayr.speedX = 0;
        myConfig.myPlayr.speedY = 0;
    },
    checkToken: (search) => {
        let checket = false;
        myConfig.wallMass.forEach(item => {
            if (item.type === search && item.x === myConfig.myPlayr.x && item.y === myConfig.myPlayr.y) {
                checket = true;
                return checket;
            }
        });
        return checket;
    },
    token: () => {
        if (!Controls.checkToken("image")) {
            myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", myConfig.myPlayr.x, myConfig.myPlayr.y, "image"));
        } else {
            myConfig.wallMass.splice(Controls.searchElement("image"), 1);
        }
    },
    downToken: () => {
        if (!Controls.checkToken("image")) {
            myConfig.wallMass.push(new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", myConfig.myPlayr.x, myConfig.myPlayr.y, "image"));
        }
    },
    upToken: () => {
        if (Controls.searchElement("image") !== false) {
            myConfig.wallMass.splice(Controls.searchElement("image"), 1);
        }
    },
    searchElement: (search) => {
        let ind = false;
        myConfig.wallMass.forEach((item, index) => {
            if (item.type === search && item.x === myConfig.myPlayr.x && item.y === myConfig.myPlayr.y) {
                return ind = index;
            }
        });
        return ind;
    }
};
module.exports.Controls = Controls;