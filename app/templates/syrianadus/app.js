var express = require('express');
var app =  express();


app.set('view engine', 'jade');
app.use(express.static(__dirname + '/assets'));
//APIS



//Routing
app.get('/', function (req, res) {
    res.render('index');
})
app.get('/index', function (req, res) {
    res.render('index');
})

app.get('/hello',function(req,res){
    res.send('Hello world!');
})

//
app.listen(3000,function(){
    console.log("Server is up!");
});