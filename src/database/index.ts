import prisma from './client'

prisma
  .$connect()
  .then(() => {
    console.log('📦 Successfully connected with database')
  })
  .catch((error: ErrorEvent) => {
    console.log('❌ Error connecting to database', error)
  })
