'use strict';

//jquery add
let $ = require("jquery")
// selectors
let htmlObj = {
    lvlSelect: $("select"),
    FileLoad: $("#filegame"),
    restart: $("#start"),
    Window: $(window),
    KarolLoad: $("#loading"),
    KarolSubmit: $("#gocode")
};
//rename myConfig to mapPropertis
let mapPropertis = {
    myPlayr: '', coin: '', myScore: '',//обекти игри
    windowMap: {x: '', y: ''},// розммери сетки
    wallMass: [], // масив стен и обектов
    mapObj: {mapArray: '', mapFlag: false},// получаемий файл с сервера
    idexSelect: htmlObj.lvlSelect.value, boolstart: true, levelTurn: 2
};

//
let playrTurn = {
    up: require("../assets/karol_up.png"),
    down: require("../assets/karol_down.png"),
    left: require("../assets/karol_left.png"),
    right: require("../assets/karol_right.png")
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

let tool = {
    canvas: "",
    ctx: "",
}
let game = {
    1: require("../assets/shers/blue.png"),
    2: require("../assets/shers/red.png"),
    3: require("../assets/shers/dark.png"),
    4: require("../assets/shers/green.png"),
    5: require("../assets/shers/withe.png"),
    6: require("../assets/shers/yellow.png")
}

module.exports = {
    "game": game,
    "tool": tool,
    "htmlObj": htmlObj,
    "wordlTask": wordlTask,
    "KarelCodeManag": KarelCodeManag,
    "playrTurn": playrTurn,
    "mapPropertis": mapPropertis
};
