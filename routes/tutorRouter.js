const  router=require('express').Router()
const tutorCtrl=require('../controllers/tutorCtrl')
const tutorAuth=require('../middlewares/tutorAuth')

router.post('/tutorRegister', tutorCtrl.tutorRegister)
router.post('/tutorLogin',tutorCtrl.tutorLogin)
router.get('/tutorLogout',tutorCtrl.tutorLogout)

router.get('/refresh_token',tutorCtrl.refreshToken)
router.get('/tutorInfor',tutorAuth, tutorCtrl.getTutor)
router.get('/getTimeTable/:tutorId',tutorCtrl.getTimeTable)
router.post('/timeTableAdd',tutorCtrl.timeTableAdd)
router.get('/getMarks/:tutorId',tutorCtrl.marksGet)
router.post('/addMarks',tutorCtrl.marksAdd)
             
module.exports=router