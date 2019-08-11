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
const loginCheck = require('../middleWare/loginCheck')

/* GET users listing. */
router.get('/list', function (req, res, next) {

  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  console.log(req.session)

  if (req.query.isadmin) {
    if (req.session.username == null) {
      // 未登录
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    author = req.session.username
  }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
})

/* GET users listing. */
router.get('/detail', function (req, res, next) {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post('/new', loginCheck, function (req, res, next) {
  req.body.author = req.session.username;
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post('/update', loginCheck, function (req, res, next) {
  const result = updateBlog(id, req.body)
  return result.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel('失败')
      )
    }
  })
})
router.post('/del', loginCheck, function (req, res, next) {
  const author = req.session.username;
  const result = deleteBlog(req.query.id, author);
  return result.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel('失败')
      )
    }
  })
})
module.exports = router
