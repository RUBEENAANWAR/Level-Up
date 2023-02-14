const  router=require('express').Router()
const adminCtrl=require('../controllers/adminCtrl')
const auth=require('../middlewares/adminAuth')
const userCtrl=require("../controllers/userCtrl")
const tutorCtrl = require('../controllers/tutorCtrl')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+'_'+file.originalname)
    }
  })
  
  let upload = multer({ storage: storage })

router.post('/adminRegister', adminCtrl.adminRegister)
router.post('/adminLogin',adminCtrl.adminLogin)
router.get('/adminLogout',adminCtrl.adminLogout)
router.get('/refresh_token',adminCtrl.refreshToken)
router.get('/adminInfor',auth, adminCtrl.getAdmin)

//users
router.get("/allUserDetails",userCtrl.getAllUsers)
router.put("/userApprove/:studentId",userCtrl.userApprovals)
router.put("/adminUserUpdate/:studentId",upload.single('avatar'),userCtrl.adminUserUpdate)

//tutors
router.get("/allTutorDetails",tutorCtrl.getAllTutors)
router.put("/tutorApprove/:tutorId",tutorCtrl.tutorApprovals)
router.put("/adminTutorUpdate/:tutorId",upload.single('avatar'),tutorCtrl.adminTutorUpdate)




module.exports=router