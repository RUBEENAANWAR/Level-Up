const mongoose=require('mongoose')

const tutorSchema=new mongoose.Schema({
    tutorId:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },  
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
       
    },
    role:{
        type:String,
        default:"tutor"
    },
    qualification:{
        type:String,
        
    },
    place:{
        type:String,
       
    },
    isApproved:{
        type:String,
        dafault:"false",
    },
    avatar:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg"
    },
    subject:{
        type:String,
    }
})

module.exports=mongoose.model('Tutors',tutorSchema)