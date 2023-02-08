const mongoose=require('mongoose')

const tutorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        default:''
    },
    role:{
        type:String,
        default:"tutor"
    },
    qualification:{
        type:String,
        default:''
    },
    place:{
        type:String,
        default:''
    },
    isApproved:{
        type:Boolean,
        dafault:false,
    },
})

module.exports=mongoose.model('Tutors',tutorSchema)