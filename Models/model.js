let mongoose = require('mongoose')

let factSchema = new mongoose.Schema({

    "icon_url":{
        type: String,
        required: true
    },
    "id":{
        type: String,
        required: true
    },
    "url":{
        type: String,
        required: true
    },
    "value":{
        type: String,
        required: true
    }
})

let fact = mongoose.model('fact_collection',factSchema) // fact_collection needs to be plural in mongoDB

/////// exports

module.exports = fact