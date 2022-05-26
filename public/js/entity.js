 function component(width, height, color, x, y,type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.globalAlpha = 1;
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        if(this.type == "cube") {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.type == "coin") {
            this.image = new Image();
            this.image.src = color;
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        if (type == "image") {

            this.image = new Image();
            this.image.src = color;
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }

    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
            if (this.x < 0) this.x = 0;
            if(this.x+this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width;
            if(this.y < 0) this.y = 0 ;
            if(this.y+this.height > myGameArea.canvas.height )  this.y = myGameArea.canvas.height - this.height;
    }

     this.crashWith = function(otherobj) {
         var myleft = this.x;
         var myright = this.x + (this.width);
         var mytop = this.y;
         var mybottom = this.y + (this.height);
         var otherleft = otherobj.x;
         var otherright = otherobj.x + (otherobj.width);
         var othertop = otherobj.y;
         var otherbottom = otherobj.y + (otherobj.height);
         var crash = true;

         if ((mybottom < othertop) ||
             (mytop > otherbottom) ||
             (myright < otherleft) ||
             (myleft > otherright)) {
             crash = false;
         }

         return crash;
     }
}

function updateGameArea() {

        myGameArea.clear();
        if(bray.length > 0)
        for (var i in bray)
        {
            console.log("в цыкле")
            bray[i].update()
        }
    myGamePiece.newPos();
    myScore.text ="x:"+ myGamePiece.x + " y:" + myGamePiece.y;
    coin.update();
    myGamePiece.update();
    myScore.update();



}
 function move(dir) {
     if (dir == "up") {myGamePiece.speedY = -1; }
     if (dir == "down") {myGamePiece.speedY = 1; }
     if (dir == "left") {myGamePiece.speedX = -1; }
     if (dir == "right") {myGamePiece.speedX = 1; }
 }
 function clearmove() {
     myGamePiece.speedX = 0;
     myGamePiece.speedY = 0;
 }

function token() {

    var x = myGamePiece.x +( myGamePiece.width/2)
    var y = myGamePiece.y + (myGamePiece.height/2)
    if(coin.height == 0)
    {
        coin.x = myGamePiece.x;
        coin.y = myGamePiece.y;
        coin.height = 70;
        coin.width = 70;
        coin.update();
    }
    else if( x >= coin.x && x  <= coin.x + coin.width && y >= coin.y && y <= coin.y + coin.height){

        coin.height = 0;
        coin.width = 0;
    }

    console.log("мелочь а приятно)")
}
