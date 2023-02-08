const  router=require('express').Router()
const tutorCtrl=require('../controllers/tutorCtrl')
const tutorAuth=require('../middlewares/tutorAuth')

router.post('/tutorRegister', tutorCtrl.tutorRegister)
router.post('/tutorLogin',tutorCtrl.tutorLogin)
router.get('/tutorLogout',tutorCtrl.tutorLogout)
// router.get('/tutorHome',tutorCtrl.tutorLogout)
router.get('/getAllTutors',tutorCtrl.getAllTutors)


router.get('/refresh_token',tutorCtrl.refreshToken)
router.get('/tutorInfor',tutorAuth, tutorCtrl.getTutor)
module.exports=router;