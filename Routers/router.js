////// setup router

let express = require('express')
let router = express.Router()

let controller = require('../Controllers/controller')

////// define routes


router.get('/showDatabase',(req,res)=>{    //query params _id to show one result / otherwise show all
    console.log('router here')

    controller.showDatabase(req,res)
})


router.get('/showJokes',(req,res)=>{    //query params _id to show one joke / otherwise show all
    console.log('router here')

    controller.showJokes(req,res)
})


router.get('/showNumberOfJokes',(req,res)=>{    //no params
    console.log('router here')

    controller.showNumberOfJokes(req,res)
})


router.get('/showShortestJoke',(req,res)=>{    //no params
    console.log('router here')

    controller.showShortestJoke(req,res)
})


////////// Change database starts here


router.post('/addToDatabaseFromAPI',(req,res)=>{    // query params to specifiy 1. total to add 2. category (Or leave both blank)
    console.log('router here')

    controller.addToDatabaseFromAPI(req,res)
})

router.delete('/deleteByID',(req,res)=>{   // query params to specify id to delete
    console.log('router here')

    controller.deleteByID(req,res)
})

router.delete('/deleteAll',(req,res)=>{   // no params
    console.log('router here')

    controller.deleteAll(req,res)
})

router.put('/changeID',(req,res)=>{ //  query params to specify IDs
    console.log('router here')

    controller.changeID(req,res)
})

router.put('/orderAll_IDs',(req,res)=>{ // no params
    console.log('router here')

    controller.orderAll_IDs(req,res)
})

router.put('/shuffle',(req,res)=>{ // no params
    console.log('router here')

    controller.shuffle(req,res)
})



/////// export router

module.exports = router