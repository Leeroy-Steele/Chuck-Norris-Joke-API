// npm install expressjs, axios, mongoose, nodemon, swagger, swagger-ui-express, redis

// initialise expressjs 

let express = require('express')
let application = express()
let port = 3000

application.use(express.json());// to access body from postman


////// mongoose starts here

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ChuckNorris_MiniProject3',{
    useNewUrlParser:true
})

const db = mongoose.connection
db.on('error',console.error.bind(console, 'connection error: '))
db.once('open',()=>{console.log('Connected to db successfully')})


//swagger starts here

const swaggerUi = require('swagger-ui-express');    
swaggerDocument = require('./swagger.json');

application.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));  // view swagger on http://localhost:3000/api-docs/


/////// webserver starts here

let route = require('./Routers/router')

application.use('/',route)

application.listen(port,()=>{console.log(`Server running at http://localhost:${port}`)})