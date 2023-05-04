require('dotenv').config();
require('./config/database');//on top, connects to db
const express =require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger= require('morgan');
const ensureLoggedIn= require('./config/ensureLoggedIn')

const app = express();
//WHEN U deploy to heroku etc u get env variable , so say if tht value exist take tht else if not deployed take port 3001.
//development port:3001
//in production we'll hav a Port number set in env variables.
//Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const PORT = process.env.PORT || 3001;

//*config
//two middleware logger,morgan,helps streamlining.
app.use(logger('dev'));
//built in express middlewr for json payload(data) for data coming from functions
app.use(express.json());

//data not being controlled by function but data coming from form url encoded
//app.use(express.urlencoded({extended:false}));

//call favicon middlewr n give path, joins folder name-dir name, 
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname,'build','favicon.ico')));
//telling to use build folder n not public folder like we did in fruits.
app.use(express.static(path.join(__dirname, 'build')));
//check if token was sent and set a user data on the req(req.user)
app.use(require('./config/checkToken'));//middleware
//all routes, anything tht comes in this path pass it to this router - goes to routes/api/users.js

app.use('/api/users', require('./routes/api/users'))
// Put API routes here, before the "catch all" route
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests when it doesnt match any route.
app.get('/*', function(req, res) {
  //http://location.com/dist/index.html
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT:${PORT}`);
})