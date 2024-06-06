import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import routes from './routes/index'
import connectToDatabase from './config/dbConfig'
import config from './config'

declare module 'express-serve-static-core' {
  interface Request {
    subdomain?: string
  }
}
const app: Express = express()
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host
  if (host) {
    const subdomain = host.split('.')[0]
    req.subdomain = subdomain
  }
  next()
})
app.get('/', (req, res) => {
  res.send(`Subdomain is ${req.subdomain}`)
})

app.get('/health', async (req, res) => {
  try {
    await connectToDatabase()

    // const redisStatus = await redisClient?.ping();
    const redisStatus = 'OK'

    res.status(200).json({ status: 'OK', database: 'OK', redis: redisStatus })
  } catch (error) {
    if (error instanceof Error) {
      // Basic check
      res.status(503).json({ status: 'ERROR', database: error.message })
    } else {
      console.error('Unexpected error type:', error)
      res.status(500).json({ status: 'ERROR', message: 'Unknown error' })
    }
  } finally {
    await mongoose.disconnect()
  }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  console.log('Original URL:', req.originalUrl)
  res.status(500).send('Something went wrong!')
})

const startServer = async () => {
  try {
    await connectToDatabase()

    app.listen(config.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
      )
    })
  } catch (error) {
    console.error('Fatal Error during server startup:', error)
    process.exit(1)
  }
}

startServer()
