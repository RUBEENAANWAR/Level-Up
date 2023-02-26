const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

studentId:{
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
    default:''
},
grade:{
    type:String,
    required:true
},
role:{
    type:String,
    default:"user"
},
dob:{
    type:String
},

isApproved:{
    type:String,
    default:"false"
},

verified:{
    type:Boolean,
    required:true,
    default:false
},
subject:{
    type:String,
},

avatar:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg"
}
},{
    timestamps:true
})

module.exports=mongoose.model('Users',userSchema)