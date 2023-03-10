const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateOTP,
  mailTransport,
  generateEmailTemplate,
  plainEmailTemplate,
} = require("../utils/mail");
const VerificationToken = require("../models/verificationToken");
const { isValidObjectId } = require("mongoose");

const userCtrl = {
  userRegister: async (req, res) => {
    try {
      console.log(6778);
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

      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP,
      });


      console.log(newUser);
      //save to mongodb
      await verificationToken.save();
      await newUser.save();

      mailTransport().sendMail({
        from: process.env._USERNAME,
        to: newUser.email,
        subject: "Verify your email account",
        html: generateEmailTemplate(OTP),
      });

      //Then create jsonwebtoken for authentication
      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      res.json({
        msg: "Student Registration Successful",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      console.log(err);
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
      if(user.verified === false) return res.status(400).json({ msg: "Email is not verified" });

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
      console.log("req.file.log", req.file);
      let avatar = req.file ? req.file.filename : null;
      const { name, email, grade, mobile, isApproved ,subject} = req.body;

      await Users.findOneAndUpdate(
        { studentId: req.params.studentId },
        {
          name,
          email,
          grade,
          mobile,
          isApproved,
          avatar,
          subject,
        }
      );
      res.json({ msg: "Student updated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  verifyEmail: async (req, res) => {
    const { studentId, otp } = req.body;
    // if (!studentId || !otp.trim())
    if (!studentId || typeof otp === 'undefined' || !otp.trim()) 
      return res
        .status(400)
        .json({ msg: "invalid request, missing parameters" });
    if (!isValidObjectId(studentId))
      return res.status(400).json({ msg: "invalid user id!" });
    const user = await Users.findById(studentId);
    if (!user)
      return res.status(400).json({ msg: "sorry, student not found!" });

    if (user.verified)
      return res.status(400).json({ msg: "This account is already verified!" });

    const token = await VerificationToken.findOne({ owner: user._id });
    if (!token)
      return res.status(400).json({ msg: "sorry, student not found!" });

    const isMatched = await token.compareToken(otp);
    if (!isMatched)
      return res.status(400).json({ msg: "Please provide a valid token" });

    user.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    mailTransport().sendMail({
      from: process.env._USERNAME,
      to: user.email,
      subject: "Confirmation",
      html: plainEmailTemplate(
        "Email verified successfully",
        "thanks for connecting with us"
      ),
    });
    res.json({ msg: "Student email is verified" });
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
