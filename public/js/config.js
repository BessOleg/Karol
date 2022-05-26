var myGamePiece;
var coin;
var myScore
var bray = [];
var filles;
var fiel = $("#filegame")[0];

fiel.addEventListener('change', function (){

    var file = fiel.files[0];
    var read = new FileReader();
    read.readAsText(file);
    read.onload =()=>{
        filles = JSON.parse( read.result)
    }
})




function startGame() {


    myGamePiece = new component(30, 30, "/public/assets/karol.png", 10, 120, "image");
    if(filles)
    for( var i in filles){
        if(filles[i].type == "cube"){
            console.log("контакт")
            bray.push( new component(filles[i].width, filles[i].height, filles[i].color, filles[i].x, filles[i].y,filles[i].type));
        }
    }
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    coin = new component(30,30,"/public/assets/coin.jpg",0,0,"coin")
    myGameArea.start();


}

var myGameArea = {
    canvas : $("#Canvas")[0],
    start : function() {
        this.canvas.width = filles == undefined  ? 480: filles[0].width;
        this.canvas.height = filles == undefined ? 270: filles[0].height ;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 30);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);

        console.log("остановитесь")
    }
}

