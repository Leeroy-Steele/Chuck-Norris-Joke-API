let dbmodel = require('../Models/model.js')

/////// Services functions

async function showDatabase(singleDataID){   //query params _id to show one result / otherwise show all
    console.log('access database / services here')
    
    let chuckNorrisFacts

    if(singleDataID){
        chuckNorrisFacts = await dbmodel.findOne( {id : singleDataID}).exec()
    }
    else{

        chuckNorrisFacts = await dbmodel.find()
        // console.log(chuckNorrisFacts)
    }
    try{
        return chuckNorrisFacts
    }
    catch(error){
        return error
    }

} 


async function showJokes(req,res){   //query params id to show one result / otherwise show all
    console.log('access database / services here')
    
    let singleDataID = req.query.id
    let chuckNorrisFactsRawData



    if(singleDataID){
        chuckNorrisFact = await dbmodel.findOne( { id : singleDataID}).exec()
        chuckNorrisFact = await chuckNorrisFact.value
        
        
        try{
            res.send(chuckNorrisFact)
        }
        catch(error){
            res.status(500).send(error)
        }
    }
    else{
        let  chuckNorrisFacts = []

        chuckNorrisFactsRawData = await dbmodel.find()

        for(let i in chuckNorrisFactsRawData){
            chuckNorrisFacts.push(chuckNorrisFactsRawData[i].value) 
        }
        
        try{
            res.send(chuckNorrisFacts)
        }
        catch(error){
            res.status(500).send(error)
        }
    }
} 

async function showNumberOfJokes(){   //query params _id to show one result / otherwise show all
    console.log('number of jokes access database / services here')
    
    let numberOfJokes = 0
    let chuckNorrisFacts = await dbmodel.find()

    for(let i in chuckNorrisFacts){numberOfJokes++}

    try{
        return numberOfJokes
    }
    catch(error){
        return error
    }

} 


async function showShortestJoke(req,res){   //query params id to show one result / otherwise show all
    console.log('showShortestJoke access database / services here')
    
    let chuckNorrisFactsRawData  = await dbmodel.find()
    let  chuckNorrisFacts = []
  

    for(let i in chuckNorrisFactsRawData){  // get array containing only the jokes 
        chuckNorrisFacts.push(chuckNorrisFactsRawData[i].value) 
    }

    let shortestJoke = chuckNorrisFacts.reduce((a,b)=>{return a.length <= b.length ? a:b})  // find the shortest joke in the array
    
    try{
        return shortestJoke
    }
    catch(err){
        return err
    }

} 

async function addToDatabaseFromAPI(data,orderIDs){   //query params _id to show one result / otherwise show all
    console.log('access database / services here')

    dbmodel.create(data)
    
    if(orderIDs==='true'){setTimeout(orderAll_IDs,1000)}
    
} 


async function deleteByID(id){   //query params _id to show one result / otherwise show all
    console.log('access database / services here')
    console.log(id)
    
    try {
        console.log("try block here")
        await dbmodel.deleteOne({ id: id })
        console.log('Deleted')
        
    } 
    catch(error){
        
        console.log("catch block here")
    }
    
} 


async function deleteAll(){   // no query params
    console.log('deleteAll access database / services here')
  
    await dbmodel.deleteMany()

} 


async function changeID(current_id,new_id){   //query params _id to show one result / otherwise show all
    console.log('access database / services here')
    console.log(current_id + ' : ' + new_id)

    const query = { id: current_id };

    try {
        console.log("try block here")
        await dbmodel.findOneAndUpdate(query, { id: new_id })
        console.log('Changed')
        
    } 
    catch(error){
        
        console.log("catch block here")
    }
    
} 

async function orderAll_IDs(){   // change all ids to start from 1
    console.log('access database / services here')

    let chuckNorrisFacts = await dbmodel.find()
    let count = 1

    for(let i in chuckNorrisFacts){
        let id = chuckNorrisFacts[i].id

        await dbmodel.updateOne({ id: id }, { id: count });

        chuckNorrisFacts[i].id = id
        count++
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
    orderAll_IDs
 
}