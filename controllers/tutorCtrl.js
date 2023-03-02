const Tutors = require("../models/tutorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users=require('../models/userModel')
const TimeTables=require('../models/timeTableModel')
const Marks=require('../models/marksModel')

const tutorCtrl = {
  tutorRegister: async (req, res) => {
    try {
      const { tutorId, name, email, mobile, qualification, password, subject } = req.body;
      if (
        tutorId === "" ||
        name === "" ||
        email === "" ||
        mobile === "" ||
        qualification === "" ||
        password === ""
      )
        return res.status(400).json({ msg: "All fields should be filled" });

      const tutor = await Tutors.findOne({ email });
      if (tutor)
        return res.status(400).json({ msg: "This email already exists" });
      if (mobile.length != 10)
        return res
          .status(400)
          .json({ msg: "Mobile number should have 10 digits" });
      if (qualification === "") {
        return res.status(400).json({ msg: "Enter your qualification" });
      }
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters long" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 12);
      const newTutor = new Tutors({
        tutorId,
        name,
        password: passwordHash,
        email,
        qualification,
        mobile,
        subject,
      });
      console.log(newTutor);
      //save to mongodb
      await newTutor.save();

      //Then create jsonwebtoken for authentication
      const access_token = createAccessToken({ id: newTutor._id });
      const refresh_token = createRefreshToken({ id: newTutor._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly:  true,
        path: "/tutor/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      res.json({
        msg: "Tutor Registration Successful",
        access_token,
        tutor: {
          ...newTutor._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  tutorLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const tutor = await Tutors.findOne({ email });
      if (!tutor) return res.status(400).json({ msg: "Tutor doesn't exist" });
      const isMatch = await bcrypt.compare(password, tutor.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
      if (email === "" || password === "") {
        return res.status(400).json({ msg: "All fields should be filled" });
      }
      if (tutor.isApproved === "false")
        return res.status(400).json({ msg: "Waiting for admin approval" });

      //if login success create access token and refresh token
      const access_token = createAccessToken({ id: tutor._id });
      const refresh_token = createRefreshToken({ id: tutor._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/tutor/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      res.json({ access_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  tutorLogout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/tutor/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, tutor) => {
          if (err)
            return res.status(400).json({ msg: "Please Login or Register" });
            const accesstoken = createAccessToken({ id: tutor._id });
            const tutorDetails = await Tutors.findById(tutor.id).select("-password");
          const userDetails=await Users.find({subject:tutorDetails.subject})
          const timeTable=await TimeTables.find({subject:tutorDetails.subject})
          const marks=await Marks.find({subject:tutorDetails.subject})

           // console.log("usr",userDetails);
          res.json({ accesstoken, rf_token, tutorDetails,userDetails,timeTable,marks});
        }
      );
    } catch (err) {
      //return res.status(500).json({ msg: err.message });
      console.log(err.message);
    }
  },
  getTutor: async (req, res) => {
    try {
      const tutor = await Tutors.findById(req.tutor.id).select("-password");
      if (!tutor) return res.status(400).json({ msg: "Tutor does not exist" });

      res.json(tutor);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllTutors: async (req, res) => {
    try {
      const allTutors = await Tutors.find().select("-password");
      if (!allTutors)
        return res.status(400).json({ msg: "Tutors details cannot be fetched" });
      res.json({ allTutors });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
    // console.log("getAllusers",allUserDetails);
  },

  // tutorApprovals: async (req, res) => {
  //   try {
  //     const { isApproved } = req.body;
  //     await Tutors.findOneAndUpdate(
  //       { tutorId: req.params.tutorId },
  //       {
  //         isApproved,
  //       }
  //     );
  //     res.json({ msg: "Tutor Approved" });
  //   } catch (err) {
  //     res.status(500).json({ msg: err.message });
  //   }
  // },
  adminTutorUpdate: async (req, res) => {
    try {
      //console.log("req.file.log",req.file);
      //console.log("req.body",req.body);
      let avatar=req.file ? req.file.filename :  null
      const { name, email, qualification, mobile, isApproved, subject} = req.body;

      await Tutors.findOneAndUpdate(
        { tutorId: req.params.tutorId },
        {
          name,
          email,
          qualification,
          mobile,
          isApproved,
          subject,
          avatar
        }
      );
      res.json({ msg: "Tutor updated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  timeTableAdd:async (req,res)=>{
    try{
      const {grade,day,subject,time}=req.body
      const newTimeTable=new TimeTables({
        grade,
        day,
        subject,
        time
      });
      await newTimeTable.save()
      res.status(200).json(newTimeTable)
    } catch (err) {
      res.status(500).json({msg:err.message})
    }
  },
  getTimeTable:async(req,res)=>{
    try{
      const tutor=await Tutors.findOne({tutorId:req.params.tutorId})
      if(tutor===null){
        return res.status(404).json({msg:"Tutor not found"})
      }
      const timeTable=await TimeTables.find({subject:tutor.subject})
      if(!timeTable){
        return res.status(404).json({msg:"Timetable not found"})
      }
      res.status(200).json({timeTable})
    }catch(err){
      res.status(500).json({msg:err.message})
    }
  },
  marksAdd:async(req,res)=>{
    try {
      const{subject,grade,marks,name}=req.body
      const newMarks=new Marks({
        grade,
        subject,
        marks,
        name
      })
      await newMarks.save()
      res.status(200).json(newMarks)
    } catch (err) {
      res.status(500).json({msg:err.msg}) 
    }
  },
  marksGet:async(req,res)=>{
    try{
      const tutor= await Tutors.findOne({tutorId:req.params.tutorId})
      if(tutor===null){
        return res.status(404).json({msg:"Tutor not found"})
      }
      const marks=await Marks.find({subject:tutor.subject})
      if(!marks){
        return res.status(404).json({msg:"Marks not found"})
      }
      res.status(200).json({marks})
    }catch(err){
      res.status(500).json({msg:err.message})
    }
    }
};

const createAccessToken = (tutor) => {
  return jwt.sign(tutor, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (tutor) => {
  return jwt.sign(tutor, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = tutorCtrl;
