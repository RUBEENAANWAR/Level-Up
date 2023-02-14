const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  userRegister: async (req, res) => {
    try {
      const { studentId, name, email, mobile, grade, password } = req.body;
      if (
        studentId === "" ||
        name === "" ||
        email === "" ||
        mobile === "" ||
        grade === "" ||
        password === ""
      )
        return res.status(400).json({ msg: "All fields should be filled" });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists" });
      if (mobile.length != 10)
        return res
          .status(400)
          .json({ msg: "Mobile  number should have 10 digits" });
      if (grade === "") {
        return res.status(400).json({ msg: "Enter your grade" });
      }
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters long" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({
        studentId,
        name,
        password: passwordHash,
        email,
        grade,
        mobile,
      });
      console.log(newUser);
      //save to mongodb
      await newUser.save();

      // //Then create jsonwebtoken for authentication
      // const access_token = createAccessToken({ id: newUser._id });
      // const refresh_token = createRefreshToken({ id: newUser._id });
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      //   maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      // });

      // res.json({
      //   msg: "Student Registration Successful",
      //   access_token,
      //   user: {
      //     ...newUser._doc,
      //     password: "",
      //   },
      // });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User doesn't exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
      if (email === "" || password === "") {
        return res.status(400).json({ msg: "All fields should be filled" });
      }
      if (user.isApproved === "false")
        return res.status(400).json({ msg: "Waiting for admin approval" });

      //if login success create access token and refresh token
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      res.json({ access_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  userLogout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
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
        async (err, user) => {
          if (err)
            return res.status(400).json({ msg: "Please Login or Register" });
          const userDetails = await Users.findById(user.id).select("-password");

          const accesstoken = createAccessToken({ id: user._id });
          res.json({ accesstoken, rf_token, userDetails });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await Users.find().select("-password");
      if (!allUsers)
        return res.status(400).json({ msg: "Users details cannot be fetched" });
      res.json({ allUsers });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
    // console.log("getAllusers",allUserDetails);
  },

  userApprovals: async (req, res) => {
    try {
      const { isApproved } = req.body;
      await Users.findOneAndUpdate(
        { studentId: req.params.studentId },
        {
          isApproved,
        }
      );
      res.json({ msg: "Student Approved" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  adminUserUpdate: async (req, res) => {
    try {
      console.log("req.file.log",req.file);
      let avatar=req.file ? req.file.filename :  null
      const { name, email, grade, mobile, isApproved } = req.body;

      await Users.findOneAndUpdate(
        { studentId: req.params.studentId },
        {
          name,
          email,
          grade,
          mobile,
          isApproved,
          avatar
        }
      );
      res.json({ msg: "Student updated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = userCtrl;
