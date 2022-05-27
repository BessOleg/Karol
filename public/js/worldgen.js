function worldgen() {
    myGamePiece = new component(30, 30, "/public/assets/karol.png", 0, 0, "image");
    if(filles)
        for( var i in filles){
            if(filles[i].type == "cube"){
                bray.push( new component(filles[i].width, filles[i].height, filles[i].color, filles[i].x, filles[i].y,filles[i].type));
            }
        }
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    coin = new component(30,30,"/public/assets/coin.png",0,0,"coin")
}


var myGameArea = {
    canvas : $("#Canvas")[0],
    start : function() {
        this.canvas.width = filles == undefined  ? 480: filles[0].width-filles[0].width%30;
        this.canvas.height = filles == undefined ? 270: filles[0].height-filles[0].height%30;
        this.context = this.canvas.getContext("2d");

        this.interval = setInterval(updateGameArea, 100);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);

        console.log("остановитесь")
    },
    netupdate: function (){
        for (var x = 0.5; x < this.canvas.width; x += 30) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);
        }

        for (var y = 0.5; y < this.canvas.height; y += 30) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);
        }
        this.context.strokeStyle = "#888";
        this.context.stroke();
    }
}

function updateGameArea() {

    myGameArea.clear();
    if(bray.length > 0)
        for (var i in bray)
        {
            bray[i].update()
        }

    myGamePiece.newPos();
    myGameArea.netupdate()
    myScore.text ="x:"+ myGamePiece.x + " y:" + myGamePiece.y;
    coin.update();
    myGamePiece.update();
    myScore.update();



}