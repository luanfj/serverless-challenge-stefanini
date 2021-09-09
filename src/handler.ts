import * as serverless from 'serverless-http'
import * as express from 'express'

const app = express()

app.use(express.json())

app.use((_, res) => {
  return res.status(404).json({
    error: 'Not Found'
  })
})

export default {
  app,
  handler: serverless(app)
}
