const  router=require('express').Router()
const adminCtrl=require('../controllers/adminCtrl')
const auth=require('../middlewares/adminAuth')

router.post('/adminRegister', adminCtrl.adminRegister)
router.post('/adminLogin',adminCtrl.adminLogin)
router.get('/adminLogout',adminCtrl.adminLogout)

router.get('/refresh_token',adminCtrl.refreshToken)
router.get('/adminInfor',auth, adminCtrl.getAdmin)
module.exports=router