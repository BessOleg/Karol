let {myConfig}=require("./storage")

'use strict';
let crashWith = () => {
    let myleft = myConfig.myPlayr.x;
    let myright = myConfig.myPlayr.x + (myConfig.myPlayr.width);
    let mytop = myConfig.myPlayr.y;
    let mybottom = myConfig.myPlayr.y + (myConfig.myPlayr.height);
    for (let i in myConfig.wallMass) {
        if (myConfig.wallMass[i].type !== "image" && myConfig.wallMass[i].type !== "font") {
            let otherleft = myConfig.wallMass[i].x;
            let otherright = myConfig.wallMass[i].x + myConfig.wallMass[i].width;
            let othertop = myConfig.wallMass[i].y;
            let otherbottom = myConfig.wallMass[i].y + myConfig.wallMass[i].height;
            var currentStep = 0;
            switch (myConfig.levelTurn) {
                case 0: { // up
                    if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mytop >= othertop && mytop <= otherbottom)) {
                        currentStep = 0;
                    } else currentStep = -myConfig.windowMap.y
                }
                    break;
                case 1: { // left
                    if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myleft >= otherleft && myleft <= otherright)) {
                        currentStep = 0;
                    } else currentStep = -myConfig.windowMap.x
                }
                    break;
                case 2: { // down
                    if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mybottom >= othertop && mybottom <= otherbottom)) {
                        currentStep = 0;
                    } else currentStep = myConfig.windowMap.y
                }
                    break;
                case 3: { // right
                    if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myright >= otherleft && myright <= otherright)) {
                        currentStep = 0;
                    } else currentStep = myConfig.windowMap.x
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