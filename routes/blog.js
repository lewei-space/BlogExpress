const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')

const {SuccessModel, ErrorModel} = require('../model/resModule')

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {

  const author=res.query.author||''
  const keyword=res.query.keyword||''

  const result=getList(author,keyword)

  return result.then(listData=>{
    res.json(
      new SuccessModel()
    )
  })


});

module.exports = router;
