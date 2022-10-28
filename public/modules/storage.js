'use strict';

// selectors
let htmlObj = {
    lvlSelect: $("select"),
    FileLoad: $("#filegame"),
    restart: $("#start"),
    Window: $(window),
    KarolLoad: $("#loading")[0],
    KarolSubmit: $("#gocode")
};
//rename myConfig to mapPropertis
let mapPropertis = {
    myPlayr: '', coin: '', myScore: '',//обекти игри
    windowMap: {x: '', y: ''},// розммери сетки
    wallMass: [], // масив стен и обектов
    mapObj: {mapArray: '', mapFlag: false},// получаемий файл с сервера
    idexSelect: htmlObj.lvlSelect.val() - 1,
    boolstart: true,
    levelTurn: 2
};

//
let playrTurn = {
    up: 'assets/karol_up.png',
    down: "assets/karol_down.png",
    left: "assets/karol_left.png",
    right: "assets/karol_right.png"
};

//karel properties
let KarelCodeManag = {//Properties
    timeset: 0, // буфер времени
    timestep: 200, // задержка в милисикундах
    timeflag: false, // флаг на время виполнения автокода
    error: 0, stepKerrol: []
};

//info world
let wordlTask = {
    condition: "",// количестов
    type: "",// тип задания
    userstep: 0
};

module.exports = {
    "htmlObj": htmlObj,
    "wordlTask": wordlTask,
    "KarelCodeManag": KarelCodeManag,
    "playrTurn": playrTurn,
    "mapPropertis": mapPropertis
}
