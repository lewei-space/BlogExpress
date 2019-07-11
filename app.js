var createError = require('http-errors'); // 检验错误页面的作用
var express = require('express'); //框架
var path = require('path'); // 路径
var cookieParser = require('cookie-parser'); //解析cookie的插件 req.cookie访问所有的cookie
var logger = require('morgan'); // 类似之前的accesslog 日志记录的作用

// var indexRouter = require('./routes/index'); //路由引入
// var usersRouter = require('./routes/users'); //路由引入

const blogRouter = require('./routes/blog'); //路由引入zj
const userRouter = require('./routes/user'); //路由引入zj

var app = express(); //每次请求的一个实力

//view engine setup view文件夹里面的文件 前端页面
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json()); //处理req.body content-tYpe 数据 json 格式
app.use(express.urlencoded({ extended: false })); // 处理urlencoded
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public'))); // public 文件夹里面的内容

// app.use('/', indexRouter); // 处理路由
// app.use('/users', usersRouter);//处理路由

app.use('/api/blog', blogRouter); // 处理路由zj
app.use('/api/user', userRouter);//处理路由zj

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
