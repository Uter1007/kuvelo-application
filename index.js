/**
 * Created by Christoph on 12.10.2015.
 */
var express = require('express'),
    logger = require('morgan'),
    ejs = require('ejs'),
    fs = require('fs'),
    helmet = require('helmet'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');

var locallydb = require('locallydb');

// load the database (folder) in './mydb', will be created if doesn't exist
var db = new locallydb('./mydb');

// load the collection (file) in './mydb/messages', will be created if doesn't exist
var collection = db.collection('messages');

////Demodata
//collection.insert([
//    {name: "message1", description: "This is a Test 1"},
//    {name: "message2", description: "This is a Test 2"},
//    {name: "message3", description: "This is a Test 3"}
//]);

//collection.save();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

app.set('strict routing', false);
app.set('case sensitive routing', false);

app.set('views', __dirname + '/server/views');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));

app.use('/static',express.static(__dirname + '/public'));

app.get('/api/messages' , function (req, res) {
    res.send(collection.items);
});

app.get('/api/messages/:id' , function (req, res) {

    console.log("Retieve: "+req.params.id);
    var id = parseInt(req.params.id);

    if (id == null){
        return res.sendStatus(400);
    }

    var message = collection.get(id);
    res.send(message);
});

app.post('/api/messages' , function (req, res) {
    console.log(req.body);

    if (!req.body) return res.sendStatus(400);

    var jsondata = req.body;

    collection.insert(jsondata);
    collection.save();

    res.end();

});

app.put('/api/messages/:id' , function (req, res) {


    if (!req.body) return res.sendStatus(400);

    var id = parseInt(req.params.id);

    if (id == null){
        return res.sendStatus(400);
    }

    var jsondata = req.body;

    console.log("Update: "+ jsondata);

    console.log("ID: "+ id);

    collection.update(id, jsondata);

    var temp = collection.get(id);

    console.log(temp);

    collection.save();

    res.end();

});

app.delete('/api/messages/:id' , function (req, res) {
    var id = parseInt(req.params.id);

    if (id == null){
        return res.sendStatus(400);
    }

    collection.remove(id);
    collection.save();

    res.end();
});

app.get('/details/:id', function(req, res){

    res.render('detail.html', {

    });

});

//All Routes
app.get('*', function(req, res){

    res.render('index.html', {

    });

}); //All Routes



app.all('/', function(req, res){

    res.render('index.html', {

    });

});

var port = 4444;
app.listen(port);

console.log("Listening on Port: " + port);