var timeset = 0, timestep = 100, timeflag = false;
var textCode = {
    timeset: 0,
    timestep: 100,
    timeflag: false
}
var karol = {
    Go: () => {
        setTimeout(move, textCode.timeset);
        if (textCode.timeflag)
            textCode.timeset += textCode.timestep;
    },
    turnLeft: () => {
        setTimeout(turn, textCode.timeset);
        if (textCode.timeflag)
            textCode.timeset += textCode.timestep;
    },
    lift: token(),
    chekWall: () => {
        if (crashWith() === 0) {
            return true
        }
        switch (myConfig.levelTurn) {
            case 2:
                if (myConfig.myPlayr.y + myConfig.myPlayr.height === myGameArea.canvas.height) {
                    return true
                } else return false
                break;
            case 1:
                if (myConfig.myPlayr.x === 0) {
                    return true
                } else return false
                break;
            case 0:
                if (myConfig.myPlayr.y === 0) {
                    return true
                } else return false
                break;
            case 3:
                if (myConfig.myPlayr.x + myConfig.myPlayr.width === myGameArea.canvas.width) {
                    return true
                } else return false

                break;

        }
        return false;
    },
}


$("#gocode").click(function () {
    let iterfase = $("#interface")[0]
    iterfase.style.pointerEvents = "none";

    textCode.timeflag = true;
    var code = $("textarea")[0].value;

    try {
        eval(code);
    } catch (e) {
        alert("Error:" + e);
    }
    setTimeout(() => iterfase.style.pointerEvents = "", textCode.timeset);
    textCode.timeflag = false;
    textCode.timeset = 0;

})

