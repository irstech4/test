require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET,
  saltWorkFactor: process.env.SALT_WORK_FACTOR || 10,
}

export default config
