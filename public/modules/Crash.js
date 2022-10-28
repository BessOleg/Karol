'use strict';
let {mapPropertis} = require("./storage")


function crashWith () {
    let myleft = mapPropertis.myPlayr.x;
    let myright = mapPropertis.myPlayr.x + (mapPropertis.myPlayr.width);
    let mytop = mapPropertis.myPlayr.y;
    let mybottom = mapPropertis.myPlayr.y + (mapPropertis.myPlayr.height);
    for (let i in mapPropertis.wallMass) {
        if (mapPropertis.wallMass[i].type !== "image" && mapPropertis.wallMass[i].type !== "font") {
            let otherleft = mapPropertis.wallMass[i].x;
            let otherright = mapPropertis.wallMass[i].x + mapPropertis.wallMass[i].width;
            let othertop = mapPropertis.wallMass[i].y;
            let otherbottom = mapPropertis.wallMass[i].y + mapPropertis.wallMass[i].height;
            var currentStep = 0;
            switch (mapPropertis.levelTurn) {
                case 0: { // up
                    if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mytop >= othertop && mytop <= otherbottom)) {
                        currentStep = 0;
                    } else currentStep = -mapPropertis.windowMap.y
                }
                    break;
                case 1: { // left
                    if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myleft >= otherleft && myleft <= otherright)) {
                        currentStep = 0;
                    } else currentStep = -mapPropertis.windowMap.x
                }
                    break;
                case 2: { // down
                    if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mybottom >= othertop && mybottom <= otherbottom)) {
                        currentStep = 0;
                    } else currentStep = mapPropertis.windowMap.y
                }
                    break;
                case 3: { // right
                    if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myright >= otherleft && myright <= otherright)) {
                        currentStep = 0;
                    } else currentStep = mapPropertis.windowMap.x
                }
                    break;
            }
            if (currentStep === 0) {
                return currentStep;
            }
        }
    }
    return currentStep;
};
module.exports.crashWith = crashWith;
