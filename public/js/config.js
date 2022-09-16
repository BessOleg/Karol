var myConfig = {
    myPlayr: '', coin: '', myScore: '',//обекти игри
    windowMap: {x: '', y: ''},// розммери сетки
    wallMass: [], // масив стен и обектов
    mapObj: {mapArray: '', mapFlag: false},// получаемий файл с сервера
    idexSelect: $("select")[0].selectedIndex,
    FileLoad: $("#filegame")[0],
    startStop: $("#start"),
    boolstart: true,
    levelTurn: 2
};

myConfig.startStop.on("mousedown",()=> {
    startGame();
});

// авто изменение окна карти
$( window ).resize(()=>{
    myWindowMap();
});



myWindowMap = () => {
    myConfig.windowMap.x = Math.round((window.innerWidth / 320) * 20);
    myConfig.windowMap.y = Math.round((window.innerHeight / 480) * 35);
    //KarelCodeManag.stepKerrol=[];
    //worldgen();
    myGameArea.clear();
    myGameArea.stop();
    startGame();
};


window.onload = () => {
    selload().then(data => {
        myConfig.mapObj.mapArray = data;
        startGame();
    });
    myWindowMap();
};

// функция запроса обекта карти у сервера
function selload() {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/file');

        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
            //  console.log(reject);
        }
        // console.log(date)
        myConfig.startStop.removeAttr('disabled');
        xhr.send();
    });

}

myConfig.FileLoad.addEventListener('change', function () {
    let file = myConfig.FileLoad.files[0];
    console.log(myConfig.FileLoad.files[0]);
    let read = new FileReader();
    read.readAsText(file);
    read.onload = () => {
        myConfig.mapObj.mapArray = JSON.parse(read.result)
    };
    myConfig.mapObj.mapFlag = true;
    myConfig.startStop.removeAttribute('disabled');
    //startGame();
});


function startGame() {


    if (myConfig.boolstart) {
        myConfig.idexSelect = $("select")[0].selectedIndex;
        worldgen();
        myGameArea.start();

    } else {
        myGameArea.stop();
        myGameArea.clear();

    }


}

var crashWith = () => {
    let myleft = myConfig.myPlayr.x;
    let myright = myConfig.myPlayr.x + (myConfig.myPlayr.width);
    let mytop = myConfig.myPlayr.y;
    let mybottom = myConfig.myPlayr.y + (myConfig.myPlayr.height);
    for (var i in myConfig.wallMass) {
        if(myConfig.wallMass[i].type !=="image")
        {let otherleft = myConfig.wallMass[i].x;
        let otherright = myConfig.wallMass[i].x + myConfig.wallMass[i].width;
        let othertop = myConfig.wallMass[i].y;
        let otherbottom = myConfig.wallMass[i].y + myConfig.wallMass[i].height;
        var currentStep = 0;
        switch (myConfig.levelTurn) {
            case 0: { // up
                if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mytop >= othertop && mytop <= otherbottom)) {
                    currentStep = 0;
                } else currentStep = -myConfig.windowMap.y

            }
                break;
            case 1: { // left
                if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myleft >= otherleft && myleft <= otherright)) {
                    currentStep = 0;
                } else currentStep = -myConfig.windowMap.x
            }
                break;
            case 2: { // down
                if ((myleft >= otherleft && myleft <= otherright) && (myright >= otherleft && myright <= otherright) && (mybottom >= othertop && mybottom <= otherbottom)) {
                    currentStep = 0;
                } else currentStep = myConfig.windowMap.y
            }
                break;
            case 3: { // right
                if ((mytop >= othertop && mytop <= otherbottom) && (mybottom >= othertop && mybottom <= otherbottom) && (myright >= otherleft && myright <= otherright)) {
                    currentStep = 0;
                } else currentStep = myConfig.windowMap.x
            }
                break;
        }
        if (currentStep === 0) {
            return currentStep;
        }}
    }
    return currentStep;

};



