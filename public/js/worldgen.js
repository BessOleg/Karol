//загрузка элементов мира

function worldgen() {
    if (myConfig.mapObj.mapFlag === true) {
        maps(myConfig.mapObj.mapArray);
    } else {

        maps(myConfig.mapObj.mapArray[myConfig.idexSelect]);
    }

}

function  maps(map) {
    myConfig.myPlayr = new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/karol.png", 0, 0, "image");
    myConfig.myScore = new component("15px", "Consolas", "black", 60, 30, "text");
    myConfig.coin = new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", 0, 0, "image");
    generation(map);


}

function generation(files) {
    if (files)
        for (var i in files) {
            if (files[i].type === "cube") {
                myConfig.wallMass.push(new component(
                    files[i].width === 0 ? 2 : files[i].width * myConfig.windowMap.x,
                    files[i].height === 0 ? 2 : files[i].height * myConfig.windowMap.y,
                    files[i].color, files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, files[i].type));
            }
            if (files[i].type === "image") {
                myConfig.coin = new component(myConfig.windowMap.x, myConfig.windowMap.y, "assets/coin.png", files[i].x * myConfig.windowMap.x, files[i].y * myConfig.windowMap.y, "image");
            }
        }
}


