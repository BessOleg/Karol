function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    if (this.type == "image") {
        this.image = new Image();
        this.image.src = color;
    }

    this.update = function () {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.globalAlpha = 1; // прозрачность

        if (this.type == "text") {
            ctx.globalAlpha = 0.3;
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }

        if (this.type == "cube") {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    }


    this.newPos =  function () {
        //up
        if (bray.length > 0) {
            if (this.speedX != 0) {
                //console.log("crashX")
                this.x += this.crashWith();
            }
            if (this.speedY != 0) {
              //  console.log("crashY")
                this.y += this.crashWith();
            }
        } else {
           // console.log("speed")
            this.x += this.speedX;
            this.y += this.speedY;
        }

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > myGameArea.canvas.height) this.y = myGameArea.canvas.height - this.height;
    }
    this.crashWith = function () {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        if (bray.length >= 0) {
            for (var i in bray) {
                let otherleft = bray[i].x;
                let otherright = bray[i].x + bray[i].width;
                let othertop = bray[i].y;
                let otherbottom = bray[i].y + bray[i].height;
                var ttn=0;
                switch (trn) {
                    case 0: { // up
                        if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mytop >= othertop && mytop <= otherbottom)) {
                            ttn = 0;
                        } else ttn = -shagY

                    }
                        break;
                    case 1: { // left
                        if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myleft >= otherleft && myleft <= otherright)) {
                            ttn = 0;
                        } else ttn = -shagX
                    }
                        break;
                    case 2: { // down
                        if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mybottom >= othertop && mybottom <= otherbottom)) {
                            ttn = 0;
                        } else ttn = shagY
                    }
                        break;
                    case 3: { // right
                        if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myright >= otherleft && myright <= otherright)) {
                            ttn = 0;
                        } else ttn = shagX
                    }
                        break;
                }
                if (ttn == 0) {
                    return ttn;
                }
            }
            console.log(ttn);
            return ttn;
        }
    }
}


