const express = require("express")
const path = require("path")

const app = express()

app.set('views', path.resolve(__dirname+'/views'))
app.set('view engine', 'ejs')

let port = 8008

app.listen(port, function(){

    console.log(`Server is running at http://localhost:${port}`)
})
