var express = require('express');
var fs = require('fs');

var myTime = 432000;// 5-day
const app = express();
const path = require('path');
const cors = require("cors");

app.use(cors({
    origin: ["*"]
}));

//app.set('view cache', true);

//app.use(express.static('public'));// добавить кеширование
app.use(express.static(__dirname + '/public', cors(), {maxAge: myTime}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


//console.log(__dirname);

app.get('/file', cors(), (req, res) => {

    var rawdata = fs.readFileSync('./public/maps/levels.json');
    var level = JSON.parse(rawdata);
    res.status(200).send(JSON.stringify(level));
    // console.log(JSON.stringify(level))
    console.log(req.ip);

});

app.use((req, res) => {
    res.status(404).send('Invalid Error 404')
});

app.listen(3000, () => {
    console.log("started");
});

