const express = require('express');
const Ninja = require('../models/ninja')

//routers
const router = express.Router();

//get ninjas from db
router.get('/ninjas',(req,res,next)=>{
    Ninja.aggregate([
        {
            $geoNear :{
                near:{   
                    type : "Point",
                    coordinates : [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: 100000000, 
                spherical : true
            }
        }
    ]
       
   
    ).then(function(ninjas){
        res.send(ninjas)
    })
})
//add ninjas to db
router.post('/ninjas',(req,res,next)=>{
  
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja)
       }).catch(next)
  
  
    
})
//update ninjas in db
router.put('/ninjas/:id',(req,res,next)=>{
    Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja)
        })
    })
})
//delete ninjas from db
router.delete('/ninjas/:id',(req,res)=>{
    Ninja.findByIdAndDelete({_id:req.params.id}).then(function(ninja){
        res.send(ninja)
    })
})



module.exports = router;