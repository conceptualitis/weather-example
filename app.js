// lets us use react templates on the server
require('node-jsx').install({ extension: '.jsx' });

var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressState = require('express-state'),
    routes = require('app/routes/server'),
    createContext = require('app/middleware/create-context'),
    run = require('app/middleware/run'),
    app = express();

expressState.extend(app);
app.set('state namespace', 'App');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(createContext);
app.use('/', routes);
app.use(run);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });
}

module.exports = app;
