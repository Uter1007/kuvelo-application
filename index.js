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

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


app.use(bodyParser.json());
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
    fs.readFile( __dirname + "/" + "messages.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});

app.get('/detail', function(req, res){

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