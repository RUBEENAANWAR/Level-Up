const  router=require('express').Router()
const userCtrl=require('../controllers/userCtrl')
const userAuth=require('../middlewares/userAuth')

router.post('/userRegister', userCtrl.userRegister)
router.post('/userLogin',userCtrl.userLogin)
router.get('/userLogout',userCtrl.userLogout)

router.get('/refresh_token',userCtrl.refreshToken)
router.get('/userInfor',userAuth, userCtrl.getUser)
module.exports=router