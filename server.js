const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

require('./model/subscribers_model');

const index = require('./router/index');
const push = require('./router/push');
const subscribe = require('./router/subscriber');

const keys = require('./config/keys');

mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect( keys.mongoURI, { useNewUrlParser:true , useUnifiedTopology: true} )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});



// Use Routes

app.use('/', index);
app.use('/subscribe', subscribe);
app.use('/push', push);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});