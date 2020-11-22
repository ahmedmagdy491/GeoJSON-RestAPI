const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
    type:{
        type : String,
        default : "Point"
    },
    coordinates:{
        type : [Number],
        index : "2dsphere"
    }
})

const NinjaSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, "Name field is required"]
    },
    rank :{
        type : String,
    },
    available :{
        type : Boolean,
        default : false
    },
    //add in geo location
    geometry : GeoSchema
});

module.exports = mongoose.model('ninja', NinjaSchema);

