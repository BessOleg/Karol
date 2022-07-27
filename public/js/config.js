var myGamePiece, coin, myScore,  filles, bray = [], flag = true, filemap = false, selectI;
var shagX,shagY
var button = $("#start")[0];
var input = $("#filegame")[0];

MyShag=()=>{
    shagX = Math.round((window.innerWidth / 320)*20)
    shagY = Math.round((window.innerHeight / 480)*35)
    myGameArea.stop()
    myGameArea.clear()
    startGame();
}
window.onload =  function () {
    selload().then(data=> {
        filles = data;
        startGame();
    });MyShag();
   // console.log(filles);
}

  function selload() {
    return new Promise((resolve)=>{
        selectI = $("select")[0].selectedIndex;
        let  xhr =  new XMLHttpRequest();
        xhr.open('GET', '/file');

        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
          //  console.log(reject);
        }
        // console.log(date)
        button.removeAttribute('disabled');
        xhr.send();
    });

}

input.addEventListener('change', function () {

    let file = input.files[0];
    let read = new FileReader();
    read.readAsText(file);
    read.onload = () => {
        filles = JSON.parse(read.result)
    }
    filemap = true;
    button.removeAttribute('disabled');
    //startGame();
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




