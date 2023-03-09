const mongoose=require("mongoose")

const marksSchema=new mongoose.Schema({
    grade:{
        type:mongoose.Schema.Types.String,
        ref:'Tutors',
        required:true
    },
    subject:{
           type:String,
           required:true
    },
    marks:{
        type:"string",
        required: true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    },{
        timeStamps:true
})

module.exports=mongoose.model('Marks',marksSchema)