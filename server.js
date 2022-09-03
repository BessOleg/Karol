var express = require('express');
var fs = require('fs');
const app = express();
const path =require( 'path');
app.set('view engine', 'ejs');
app.set('view cache', true);


//app.use(express.static('public'));// добавить кеширование
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


console.log(__dirname);

app.get('/', function (req, res) {
   // res.sendFile(path.join(__dirname,'views','monit.ejs'))
    res.render('monit.ejs');

});
app.get('/file', (req, res) => {
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

