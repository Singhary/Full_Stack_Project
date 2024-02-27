const moongoose = require("mongoose");

const bookingSchema = new moongoose.Schema({
    place:{type:moongoose.Schema.Types.ObjectId , require:true , ref:'place'} ,
    user:{type:moongoose.Schema.Types.ObjectId , require:true},
    checkIn:{type:Date , require:true} ,
    checkOut:{type:Date , require:true} ,
    name:{type:String , require:true} ,
    phone:{type:String , require:true} ,
    price:{type:Number},
})

const BookingModel = moongoose.model('Booking' , bookingSchema);

module.exports=BookingModel ; 