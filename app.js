import createError from 'http-errors'
import express from 'express'
import path, { dirname } from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import logger from './utilities/logger.js'
import routes from './routes/index.js'
import rateLimiter from './middleware/rateLimiter.js'
import './database/index.js'

const app = express()

console.log("hy");


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(rateLimiter)
app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)
app.use(
  morgan('combined', {
    stream: logger.stream,
    skip: (req, res) => {
      console.log("hhyh");
      console.log(req.url);
      // Skip to log health endpoint
      return req.url === '/health'
    }
  })
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(createError(404),function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  // console.log(err,"hyhyh");
  res.locals.error = req.app.get('env') === 'development' ? err : {}


  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
