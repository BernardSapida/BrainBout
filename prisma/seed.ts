import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb'

const prisma = new PrismaClient()

async function main() {
  const bernard = await prisma.users.upsert({
    where: { email: 'bernardsapida1706@gmail.com' },
    update: {},
    create: {
      id: 'kp_c8b18415a23649baa12b493d359d5132',
      given_name: 'Bernard',
      family_name: 'Sapida',
      email: 'bernardsapida1706@gmail.com',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocL--g1uFWmoAQG-GOxK5WLug5-_QIdbiop1RLJT411txNM=s96-c',
    },
  })

  const score = await prisma.leaderboards.upsert({
    where: { userId: 'kp_c8b18415a23649baa12b493d359d5132' },
    update: {},
    create: {
      score: 10,
      subject: 'cosc80b',
      userId: 'kp_c8b18415a23649baa12b493d359d5132'
    },
  })

  console.log({ bernard, score })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })