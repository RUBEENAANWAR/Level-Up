const Tutors = require("../models/tutorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TutorCtrl = {
  tutorRegister: async (req, res) => {
    try {
      const { name, email, mobile, qualification, password } = req.body;
      if (
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
          .json({ msg: "Mobile  number should have 10 digits" });
      if (qualification === "") {
        return res.status(400).json({ msg: "Enter your grade" });
      }
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters long" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 12);
      const newTutor = new Tutors({
        name,
        password: passwordHash,
        email,
        qualification,
        mobile
      });
      console.log(newTutor);
      //save to mongodb
      await newTutor.save();

      //Then create jsonwebtoken for authentication
      const access_token = createAccessToken({ id: newTutor._id });
      const refresh_token = createRefreshToken({ id: newTutor._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
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
      if (!tutor) return res.status(400).json({ msg: "User doesn't exist" });
      const isMatch = await bcrypt.compare(password, tutor.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
      if (email === "" || password === "") {
        return res.status(400).json({ msg: "All fields should be filled" });
      }

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
      return res.json({ msg: "Tutor Logged out" });
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
          const tutorDetails = await Tutors.findById(tutor.id).select("-password");

          const accesstoken = createAccessToken({ id: tutor._id });
          res.json({ accesstoken, rf_token, tutorDetails });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
};

const createAccessToken = (tutor) => {
  return jwt.sign(tutor, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (tutor) => {
  return jwt.sign(tutor, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = TutorCtrl;
