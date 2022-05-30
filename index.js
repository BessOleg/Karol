var express = require('express');
var fs = require('fs');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


console.log(__dirname);
app.get('/', function (req, res) {
    res.render('monit.ejs');

});
app.get('/file', (req, res) => {
    var rawdata = fs.readFileSync('./public/maps/levels.json');
    var level = JSON.parse(rawdata);
    res.send(JSON.stringify(level));

});

app.listen(3000, () => {
    console.log("started");
});

