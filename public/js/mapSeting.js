// конфигы и загрузка мапи
var myGameArea = {
    canvas: $("#Canvas")[0],
    start: function () {

        if (filemap == true) {
            console.log("client")
            this.canvas.width = filles == undefined ? 480 : filles[0].width + filles[0].width % 30;
            this.canvas.height = filles == undefined ? 270 : filles[0].height + filles[0].height % 30;

        } else {
            console.log("server")
            this.canvas.width = selectI >= 2 ? 480 : filles[selectI][0].width + filles[selectI][0].width % 30;
            this.canvas.height = selectI >= 2 ? 270 : filles[selectI][0].height + filles[selectI][0].height % 30;

        }
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 85);

        flag = false;
        button.innerText = "stop";
    }, clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, stop: function () {

        bray = [];
        flag = true;
        trn = 2;
        filles = null;
        button.setAttribute("disabled", true);
        if (filemap)
            filemap = false;
        selload();
        button.innerText = "start";
        clearInterval(this.interval);

    }, netupdate: function () {
        this.context.strokeStyle = "rgb(195,205,250)";
        this.context.stroke();

        for (var x = 0.5; x < this.canvas.width; x += 30) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);
        }

        for (var y = 0.5; y < this.canvas.height; y += 30) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);
        }

    }
}
