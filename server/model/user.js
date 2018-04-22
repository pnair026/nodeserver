var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    FirstName:{ type: String,trim: true,require:true},
    LastName:{type:String,trim:true,require:true},
    UserName:{type:String,trim:true,require:true},
    Password:{type:String,trim:true,require:true},
    Email:String,
    Address:String,
    City:String,
    State:String,
    Country:String,
    PinCode:{type:Number,trim:true,require:true,lowercase:true}
});
module.exports= mongoose.model('User',userSchema);
