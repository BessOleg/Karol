// конфигы и загрузка мапи
var myGameArea = {
    canvas: $("#Canvas")[0],
    start: function () {

        if (filemap == true) {
            console.log("client")
            this.canvas.width = filles == undefined ? shagX*5 : filles[0].width + filles[0].width % shagX;
            this.canvas.height = filles == undefined ? shagX*5 : filles[0].height + filles[0].height % shagY;

        } else {
            console.log("server")
            this.canvas.width = selectI >= 2 ? shagX*5: filles[selectI][0].width *shagX;
            this.canvas.height = selectI >= 2 ? shagY*5 : filles[selectI][0].height *shagY;

        }
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 30);

        flag = false;
        button.innerText = "stop";
    }, clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, stop: function () {

        bray = [];
        flag = true;
        trn = 2;
       // filles = null;
        button.setAttribute("disabled", true);
        if (filemap)
            filemap = false;
        selload();
        button.innerText = "start";
        clearInterval(this.interval);

    },newlvl:function () {
        if(selectI < $("select")[0].length-1) {
            selectI = $("select")[0].selectedIndex++;
            coin.x = myGamePiece.x;
            coin.y = myGamePiece.y;
           // setTimeout(startGame,3000)
          //  setTimeout(startGame,3000)
        }
        else {
            selectI = $("select")[0].selectedIndex= 0;
          //  setTimeout(startGame,3000)
          //  setTimeout(startGame,3000)
        }
        startGame()
        startGame()
    }
    , netupdate: function () {
        this.context.strokeStyle = "rgba(16,206,202,0.56)";
        this.context.beginPath();

        for (var x = 0; x < this.canvas.width; x += shagX) {

            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);

        }

        for (var y = 0; y < this.canvas.height; y += shagY) {

            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);


        }
        this.context.stroke();

    }
}
