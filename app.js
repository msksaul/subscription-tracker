import express from 'express'

import { PORT } from './config/env'

import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import subscriptionRouter from './routes/subscription.routes'
import connectToDatabase from './database/mongodb'
import errorMiddleware from './middlewares/error.middleware'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!')
})

app.listen(3000, async () => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`)

  await connectToDatabase()
})

export default app