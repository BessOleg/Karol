var myGamePiece, coin, myScore, filles, bray = [], flag = true, filemap = false, selectI;
var button = $("#start")[0];
var input = $("#filegame")[0];

window.onload = selload();

async function selload() {
    selectI = $("select")[0].selectedIndex;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/file');
    xhr.send();

    xhr.onload = function () {
        filles = JSON.parse(xhr.responseText);
    }
    button.removeAttribute('disabled');
}

input.addEventListener('change', async function () {

    var file = input.files[0];
    var read = new FileReader();
    read.readAsText(file);
    read.onload = () => {
        filles = JSON.parse(read.result)
    }
    filemap = true;
    button.removeAttribute('disabled');

})

function startGame() {


    if (flag) {
        worldgen();
        myGameArea.start();

    } else {
        myGameArea.stop();
        myGameArea.clear();

    }


}




