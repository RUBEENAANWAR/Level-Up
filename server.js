require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser')

const app=express()
app.use(express.json())
app.use(cookieParser())
const corsOptions= {
    origin:'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200,
  };
  
  app.use(cors(corsOptions));
app.use(fileUpload({
    useTempFiles:true

}))

//Routes
app.use('/admin',require('./routes/adminRouter'))
app.use('/user',require('./routes/userRouter'))
//app.use('/tutor',require('./routes/'))

//connect to mongodb
const URI=process.env.MONGODB_URL
mongoose.connect(URI,err=>{
    if(err) throw err;
    console.log('connected to MongoDB');
})


app.get('/',(req,res)=>{
    res.json({msg:"Welcome"})
})


const PORT= process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Server is running on port',PORT);
})

