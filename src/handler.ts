import * as serverless from 'serverless-http'
import * as express from 'express'

import 'express-async-errors'

import routes from './routes'
import AppError from './utils/AppError'

const app = express()

app.use(express.json())

app.use(routes)

app.get('/', (req, res) => {
  return res.json({ hello: 'world' })
})

app.use((_, res) => {
  return res.status(404).json({
    error: 'Not Found'
  })
})

app.use(
  (
    err: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    } else {
      response.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    }

    next(err)
  }
)

export const handler = serverless(app)
