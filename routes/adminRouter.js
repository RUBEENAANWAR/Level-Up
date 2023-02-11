const  router=require('express').Router()
const adminCtrl=require('../controllers/adminCtrl')
const auth=require('../middlewares/adminAuth')
const userCtrl=require("../controllers/userCtrl")
const tutorCtrl = require('../controllers/tutorCtrl')
router.post('/adminRegister', adminCtrl.adminRegister)
router.post('/adminLogin',adminCtrl.adminLogin)
router.get('/adminLogout',adminCtrl.adminLogout)
router.get("/allUserDetails",userCtrl.getAllUsers)
router.get("/allTutorDetails",tutorCtrl.getAllTutors)
router.get('/refresh_token',adminCtrl.refreshToken)
router.get('/adminInfor',auth, adminCtrl.getAdmin)
router.put("/userApprove/:studentId",userCtrl.userApprovals)
router.put("/tutorApprove/:tutorId",tutorCtrl.tutorApprovals)
router.put("/adminUserUpdate/:studentId",userCtrl.adminUserUpdate)
//router.put("/adminTutorUpdate/:tutorId",tutorCtrl.adminTutorUpdate)


module.exports=router