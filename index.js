var express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname));
console.log(__dirname);
app.get('/', function (req, res) {
    res.render('monit.ejs');
});


app.listen(3000,()=>{
    console.log("started");
});