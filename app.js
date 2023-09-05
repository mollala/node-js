const express = require("express")

const path = require('path')
const apiRouter = require('./routes/routing')
const mongoose = require('mongoose')
const session = require('express-session'); 
const FileStore = require('session-file-store')(session);

const app = express()

// Connect to MongoDB
mongoose.connect("mongodb+srv://sjundata:1234@cluster0.efxy92b.mongodb.net/", { useNewUrlParser: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.set('views',path.resolve(__dirname+'/views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(session({                                          
    secret:"asdfasffdas",
    resave:false,
    saveUninitialized:true,
    store : new FileStore()                              
}))

app.use('/',apiRouter)

let port = 8008

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})