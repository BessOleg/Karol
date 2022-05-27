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
            if(this.x < 0) this.x = 0;
            if(this.x+this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width;
            if(this.y < 0) this.y = 0 ;
            if(this.y+this.height > myGameArea.canvas.height )  this.y = myGameArea.canvas.height - this.height;
    }
     this.crashWith = function() {
         var myleft = this.x;
         var myright = this.x + (this.width);
         var mytop = this.y;
         var mybottom = this.y + (this.height);
         if(filles){
             for (var i in filles){
                 if(i!=0){
                      //( a.y < b.y1 || a.y1 > b.y || a.x1 < b.x || a.x > b.x1 );
                     var otherleft = filles[i].x;
                     var otherright = filles[i].x + (filles[i].width);
                     var othertop = filles[i].y;
                     var otherbottom = filles[i].y + (filles[i].height);
                     var crash = true;
                     if((mybottom <= othertop) || (mytop >= otherbottom) || (myright <= otherleft) || (myleft >= otherright))
                     {
                         crash = false;

                     }
                 }
             }
             return crash;

         }
     }
}


