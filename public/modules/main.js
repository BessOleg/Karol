
let {myGameArea,startGame} = require("./worldCanvas");
let {myConfig,htmlObj}= require("./storage")
'use strict';

// load map of server
let selload = () => {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/file');
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        };
        htmlObj.restart.removeAttr('disabled');
        xhr.send();
    });
};



window.onload = () => {
    selload().then(data => {
        myConfig.mapObj.mapArray = data;
        // console.log(myConfig);
        startGame();
    });
    myGameArea.myWindowMap();
};