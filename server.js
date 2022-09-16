var express = require('express');
var fs = require('fs');

var myTime = 432000;// 5-day
const app = express();
const path = require('path');
app.set('view engine', 'ejs');

//app.set('view cache', true);

//app.use(express.static('public'));// добавить кеширование
app.use(express.static(__dirname + '/public', {maxAge: 0}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


//console.log(__dirname);
app.get('/', function (req, res) {
    res.render('monit.ejs');

});
app.post('/file', (req, res) => {
    var rawdata = fs.readFileSync('./public/maps/levels.json');
    var level = JSON.parse(rawdata);
    res.send(JSON.stringify(level));
});

app.use((req, res) => {
    res.status(404).send('Invalid Error 404')
});

app.listen(3000, () => {
    console.log("started");
});

