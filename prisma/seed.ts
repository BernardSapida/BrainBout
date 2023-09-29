import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const bernard = await prisma.user.upsert({
    where: { email: 'bernardsapida1706@gmail.com' },
    update: {},
    create: {
      id: 'kp_c8b18415a23649baa12b493d359d5132',
      given_name: 'Bernard',
      family_name: 'Sapida',
      email: 'bernardsapida1706@gmail.com',
      picture: 'https://res.cloudinary.com/dwwdihklx/image/upload/v1695957223/display-pictures/t77vrr2xn7pdz5vukzjk.jpg',
    },
  })

  console.log({ bernard })
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