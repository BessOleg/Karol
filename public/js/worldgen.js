//загрузка элементов мира

function worldgen() {
    if (filemap == true) {
        maps(filles);
    } else {
        selload();
        maps(filles[selectI]);
    }

}

function maps(map) {
    myGamePiece = new component(30, 30, "/public/assets/karol.png", 0, 0, "image");
    myScore = new component("15px", "Consolas", "black", 60, 30, "text");
    coin = new component(30, 30, "/public/assets/coin.png", 0, 0, "image");
    generation(map);


}

function generation(files) {
    if (files)
        for (var i in files) {
            if (files[i].type == "cube") {
                bray.push(new component(files[i].width, files[i].height, files[i].color, files[i].x * 30, files[i].y * 30, files[i].type));
            }
            if (files[i].type == "image") {
                coin = new component(30, 30, "/public/assets/coin.png", files[i].x * 30, files[i].y * 30, "image");
            }
        }
}


