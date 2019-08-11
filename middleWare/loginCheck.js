const {ErrorModel}=require('../model/resModule')

module.exports=(req,res,next)=>{
  if (req.session.username){
    next()
    return
  }
  res.json(
    ErrorModel('未登录')
  )
}
