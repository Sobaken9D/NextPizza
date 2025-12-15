import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
  try {
    prisma.$connect()
    console.log('✅ Connected to database')
    await prisma.$disconnect()
  } catch (e) {
    console.error('❌ Connection failed:', e)
  }
}

test()