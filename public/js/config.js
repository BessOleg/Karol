var myGamePiece, coin, myScore, filles, bray = [], flag = true;
var input = $("#filegame")[0];

input.addEventListener('change', function () {

    var file = input.files[0];
    var read = new FileReader();
    read.readAsText(file);
    read.onload = () => {
        filles = JSON.parse(read.result)
    }
})

function startGame() {
    worldgen();
    if (flag) {
        myGameArea.start();
        flag = false;
    } else {
        myGameArea.stop();
        myGameArea.clear();
        bray = [];
        flag = true;
        trn = 2;
    }


}



