// конфигы и загрузка мапи
var myGameArea = {
    canvas: $("#Canvas")[0],
    start: function () {

        if (myConfig.mapObj.mapFlag === true) {
            console.log("client");
            this.canvas.width = myConfig.mapObj.mapArray === undefined ? myConfig.windowMap.x * 5 : myConfig.mapObj.mapArray[0].width + myConfig.mapObj.mapArray[0].width % myConfig.windowMap.x;
            this.canvas.height = myConfig.mapObj.mapArray === undefined ? myConfig.windowMap.y * 5 : myConfig.mapObj.mapArray[0].height + myConfig.mapObj.mapArray[0].height % myConfig.windowMap.y;

        } else {
            console.log("server");
            this.canvas.width = myConfig.idexSelect >= 2 ? myConfig.windowMap.x * 5 : myConfig.mapObj.mapArray[myConfig.idexSelect][0].width * myConfig.windowMap.x;
            this.canvas.height = myConfig.idexSelect >= 2 ? myConfig.windowMap.y * 5 : myConfig.mapObj.mapArray[myConfig.idexSelect][0].height * myConfig.windowMap.y;

        }
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 30);

        myConfig.boolstart = false;
        myConfig.startStop.innerText = "stop";
    }, clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, stop: function () {

        myConfig.wallMass = [];
        myConfig.boolstart = true;
        myConfig.levelTurn = 2;
        myConfig.startStop.attr("disabled", true);
        if (myConfig.mapObj.mapFlag) {
            myConfig.mapObj.mapFlag = false;
        }
        myConfig.startStop.removeAttr('disabled');
        //selload();
        myConfig.startStop.innerText = "start";
        clearInterval(this.interval);

    }, newlvl: function () {
        if (myConfig.idexSelect < $("select")[0].length - 1) {
            myConfig.idexSelect = $("select")[0].selectedIndex++;
            myConfig.coin.x = myConfig.myPlayr.x;
            myConfig.coin.y = myConfig.myPlayr.y;
            // setTimeout(startGame,3000)
            //  setTimeout(startGame,3000)
        } else {
            myConfig.idexSelect = $("select")[0].selectedIndex = 0;
            //  setTimeout(startGame,3000)
            //  setTimeout(startGame,3000)
        }
        startGame()
        startGame()
    }
    , netupdate: function () {
        this.context.strokeStyle = "rgba(16,206,202,0.56)";
        this.context.beginPath();

        for (var x = 0; x < this.canvas.width; x += myConfig.windowMap.x) {

            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);

        }

        for (var y = 0; y < this.canvas.height; y += myConfig.windowMap.y) {

            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);


        }
        this.context.stroke();

    }
}
