var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');

const cors = require('cors');


const expressApp = express();
expressApp.use(cors({
    origin: ['http://localhost:4200'],
    "methods": "GET,PUT,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
}))

mongoose.connect("mongodb://0.0.0.0:27017/est",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected..");
}).catch((err)=>{
    console.log(err);
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000,function check(error)
{
    if(error)
    {
        console.log("Error!!!");
    }
    else{
        console.log("Started successfully!!!");
    }
});

