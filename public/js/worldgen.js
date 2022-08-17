//загрузка элементов мира

 function worldgen() {
    if (filemap === true) {
        maps(filles);
    } else {
        selload().then(data=> {

            filles = data;
          //  startGame();
        });
        maps(filles[selectI]);
    }

}

function maps(map) {
    myGamePiece = new component(shagX, shagY, "/public/assets/karol.png", 0, 0, "image");
    myScore = new component("15px", "Consolas", "black", 60, 30, "text");
    coin = new component(shagX, shagY, "/public/assets/coin.png", 0, 0, "image");
    generation(map);


}

function generation(files) {
    if (files)
        for (var i in files) {
            if (files[i].type === "cube") {
                bray.push(new component(
                    files[i].width===0?2:files[i].width*shagX,
                    files[i].height===0?2:files[i].height*shagY,
                    files[i].color, files[i].x * shagX, files[i].y * shagY, files[i].type));
            }
            if (files[i].type === "image") {
                coin = new component(shagX, shagY, "/public/assets/coin.png", files[i].x * shagX, files[i].y * shagY, "image");
            }
        }
}


