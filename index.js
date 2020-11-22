const PORT = process.env.PORT || 8000;

//express
const express = require('express');

//routes 
const routes = require('./Routers/ApiRouter');

//Body Parser
const bodyParser = require('body-parser');

//mongoose 
const mongoose = require('mongoose')

const app = express();
//Promise & Connect Mongoose
mongoose.connect('mongodb+srv://Ahmed:test12@cluster0.jqlsh.mongodb.net/api?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true})
   
mongoose.Promise = global.Promise;

app.use(express.static('public'));

//use body-parser
app.use(bodyParser.json())

//use routes
app.use('/api',routes);

//error handling middlewear
app.use(function(err,req,res,next){
  
    res.status(422).send({error:err.message})
  
})

app.listen(PORT ,()=>{
    console.log('listening to '+ PORT)
});