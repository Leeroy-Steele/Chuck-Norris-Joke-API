let database = require('../Services/accessDatabase')
let apiCall = require('../Middleware/apiCall')

const redis = require("redis");

/////// controller functions

let redisClient;
let results;

(async () => {  // anonymous function for redis (caching)
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

async function showDatabase(req,res){    //Redis copy
    console.log('redis showDatabase controller here')

    let singleDataID = req.query.id

    if(singleDataID){

        const cacheResults = await redisClient.get(singleDataID);

        if (cacheResults) {
            console.log("Found in cache")
            // isCached = true;
            results = JSON.parse(cacheResults);
            res.send(results) 
        }else{
            console.log('not found in cache')
            let data = await database.showDatabase(singleDataID)
            if(data){await redisClient.set(singleDataID, JSON.stringify(await data));}
            
            res.send(data)   //stop postman/browser hanging

        }
    }else{
        let data = await database.showDatabase(singleDataID)
        res.send(data)   //stop postman/browser hanging
    }
}


async function showJokes(req,res){
    console.log('controller here')

    let data = await database.showJokes(req,res)

    // res.send(data)   //stop postman/browser hanging
}


async function showNumberOfJokes(req,res){
    console.log('number of jokes controller here')

    let data = await database.showNumberOfJokes()

    res.send({"Number of jokes are":data})  
}


async function showShortestJoke(req,res){
    console.log('showShortestJoke controller here')

    let data = await database.showShortestJoke(req,res)

    res.send({"the shortest joke is":data})  
}


async function addToDatabaseFromAPI(req,res){
    console.log('addToDatabaseFromAPI controller here')

    let count = req.query.totalToAdd
    let category = req.query.category
    let orderIDs = req.query.orderIDs

    if(count===undefined){count=1}   // if there are no query params 

    res.send({'Inserting ':`${count} entries`})   //stop postman/browser hanging


    while(count>0){ // while loop to continually add entries as specified in query params

        let data = await apiCall.getAPIData(category) // get api data

        database.addToDatabaseFromAPI(data,orderIDs) // add api data to mongodb
        count--
    }

}


async function deleteByID(req,res){
    console.log('controller here')

    let id = req.query.id

    res.send({'Deleting ':`${id} from database `})   //stop postman/browser hanging

    database.deleteByID(id) // delete one mongodb entry

    try{
        redisClient.del(id)
       
    }catch(err){
        console.log(err)}
}


async function deleteAll(req,res){
    console.log('deleteAll controller here')

    database.deleteAll() 

    redisClient.FLUSHALL();      

    res.send({'Deleted ':`everything from database`})   //stop postman/browser hanging
}


async function changeID(req,res){
    console.log('controller here')

    let current_id = req.query.current_id
    let new_id = req.query.new_id

    res.send({'Changing ':`${current_id} to ${new_id} `})   //stop postman/browser hanging

    database.changeID(current_id,new_id) // change one mongodb entry ID

    redisClient.FLUSHALL(); 

}


async function orderAll_IDs(req,res){
    console.log('controller here')

    res.send({'Now ':`ordering ids to look nicer`})   //stop postman/browser hanging

    database.orderAll_IDs() // change all ids

    redisClient.FLUSHALL(); 

}


async function shuffle(req,res){
    console.log('controller here')

    // res.send({'Now ':`shuffling database`})   //stop postman/browser hanging

    let count = await database.showNumberOfJokes()
  
    res.send({'Shuffling ':`${count} entries`})   //stop postman/browser hanging

    await database.deleteAll()

    while(count>0){ // while loop to continually add entries as specified in query params
        console.log('while')
        let data = await apiCall.getAPIData() // get api data

        database.addToDatabaseFromAPI(data,'true') // add api data to mongodb
        count--
    }


}


/////// export functions


module.exports = {
    showDatabase,
    showJokes,
    showNumberOfJokes,
    showShortestJoke,
    addToDatabaseFromAPI,
    deleteByID,
    deleteAll,
    changeID,
    orderAll_IDs,
    shuffle
}