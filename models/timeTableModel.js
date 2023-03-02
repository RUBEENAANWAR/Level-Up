const mongoose=require("mongoose")

const timeTableSchema=new mongoose.Schema({
    grade:{
        type:mongoose.Schema.Types.String,
        ref:'Tutors',
        required:true
    },
    day:{
        type:String,
        required:true
    },
        subject:{
           type:Array,
           required:true
    },
    time:{
        type:"string",
        required: true
    },

    },{
        timeStamps:true
})

module.exports=mongoose.model('TimeTables',timeTableSchema)