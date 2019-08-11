var express = require('express');
var router = express.Router();
const {loginLe} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModule')

/* GET users listing. */
router.post('/login', function (req, res, next) {

  const {username, password} = req.body

  const result = loginLe(username, password)

  return result.then(loginData => {
    console.log('loginData22' + JSON.stringify(loginData))
    if (loginData.username) {
      // 操作session
      req.session.username = loginData.username
      req.session.realname = loginData.realname
      res.json(
        new SuccessModel('登陆成功')
      )
      return
    }
    res.json(
      new ErrorModel('登陆失败1')
    )
  })
});


router.get('/login-test',(req,res,next)=>{
  console.log(req.session)
  if (req.session.username){
    res.json({
      errno:0,
      msg:'一登陆'
    })
    return
  }
  res.json({
    errno:-1,
    msg:'未登陆'
  })
})

module.exports = router;
