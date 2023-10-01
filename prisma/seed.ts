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

  const exam = await prisma.exams.upsert({
    where: {
      id: `${new ObjectId()}`
    },
    update: {},
    create: {
      subject: 'cosc80b',
      questions: [
        {
          type: 'multiple-choice',
          question: 'Set of instructions that tells what the computer should do.',
          choices: [
            {
              letter: 'A',
              description: 'System Software'
            },
            {
              letter: 'B',
              description: 'Operating System'
            },
            {
              letter: 'C',
              description: 'Software'
            },
            {
              letter: 'D',
              description: 'Arithmetic Logic Unit'
            },
          ],
          answer: 'C',
        },
        {
          type: 'multiple-choice',
          question: 'It hides the ugly details of a computer operations.',
          choices: [
            {
              letter: 'A',
              description: 'System Software'
            },
            {
              letter: 'B',
              description: 'Application Software'
            },
            {
              letter: 'C',
              description: 'Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'A',
        },
        {
          type: 'multiple-choice',
          question: 'With this, programmers can write programs without knowing the details.',
          choices: [
            {
              letter: 'A',
              description: 'Software'
            },
            {
              letter: 'B',
              description: 'Operating System'
            },
            {
              letter: 'C',
              description: 'System Software'
            },
            {
              letter: 'D',
              description: 'Application Software'
            },
          ],
          answer: 'C',
        },
        {
          type: 'multiple-choice',
          question: 'It controls the execution of the program.',
          choices: [
            {
              letter: 'A',
              description: 'Operating System'
            },
            {
              letter: 'B',
              description: 'Software'
            },
            {
              letter: 'C',
              description: 'Application Software'
            },
            {
              letter: 'D',
              description: 'System Software'
            },
          ],
          answer: 'A',
        },
        {
          type: 'multiple-choice',
          question: 'It manipulates the basic operations (ex. input and output operations).',
          choices: [
            {
              letter: 'A',
              description: 'System Software'
            },
            {
              letter: 'B',
              description: 'Software'
            },
            {
              letter: 'C',
              description: 'Application Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'A',
        },
        {
          type: 'multiple-choice',
          question: 'It locates free disk space in a hard disk when files need it.',
          choices: [
            {
              letter: 'A',
              description: 'Application Software'
            },
            {
              letter: 'B',
              description: 'Software'
            },
            {
              letter: 'C',
              description: 'System Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'C',
        },
        {
          type: 'multiple-choice',
          question: 'User does not need to know these processes.',
          choices: [
            {
              letter: 'A',
              description: 'Application Software'
            },
            {
              letter: 'B',
              description: 'System Software'
            },
            {
              letter: 'C',
              description: 'Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'B',
        },
        {
          type: 'multiple-choice',
          question: 'It is an example of productivity tools, email, photographs, and processors.',
          choices: [
            {
              letter: 'A',
              description: 'Application Software'
            },
            {
              letter: 'B',
              description: 'System Software'
            },
            {
              letter: 'C',
              description: 'Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'A',
        },
        {
          type: 'multiple-choice',
          question: 'This is an example of word processing software, desktop, publishing software.',
          choices: [
            {
              letter: 'A',
              description: 'Presentation Software'
            },
            {
              letter: 'B',
              description: 'Document Production Software'
            },
            {
              letter: 'C',
              description: 'Business Software'
            },
            {
              letter: 'D',
              description: 'Entertainment Software'
            },
          ],
          answer: 'B',
        },
        {
          type: 'multiple-choice',
          question: 'It creates and manipulates spreadsheet electronically.',
          choices: [
            {
              letter: 'A',
              description: 'Presentation Software'
            },
            {
              letter: 'B',
              description: 'Document Production Software'
            },
            {
              letter: 'C',
              description: 'Business Software'
            },
            {
              letter: 'D',
              description: 'Spreadsheet Software'
            },
          ],
          answer: 'D',
        },
        {
          type: 'multiple-choice',
          question: 'It creates and display information in the form of slideshow.',
          choices: [
            {
              letter: 'A',
              description: 'Presentation Software'
            },
            {
              letter: 'B',
              description: 'Database Management Software'
            },
            {
              letter: 'C',
              description: 'Multimedia Software'
            },
            {
              letter: 'D',
              description: 'Document Production Software'
            },
          ],
          answer: 'A',
        },
        {
          type: 'multiple-choice',
          question: 'It is used to store, modify, retrieve information from a storage.',
          choices: [
            {
              letter: 'A',
              description: 'Document Production Software'
            },
            {
              letter: 'B',
              description: 'Multimedia Software'
            },
            {
              letter: 'C',
              description: 'Database Management Software'
            },
            {
              letter: 'D',
              description: 'Presentation Software'
            },
          ],
          answer: 'C',
        },
        {
          type: 'multiple-choice',
          question: 'It is used for business management.',
          choices: [
            {
              letter: 'A',
              description: 'Document Production Software'
            },
            {
              letter: 'B',
              description: 'Business Software'
            },
            {
              letter: 'C',
              description: 'Database Management Software'
            },
            {
              letter: 'D',
              description: 'Presentation Software'
            },
          ],
          answer: 'B',
        },
        {
          type: 'multiple-choice',
          question: 'It is used to manipulate picture, sound, and video.',
          choices: [
            {
              letter: 'A',
              description: 'Multimedia Software'
            },
            {
              letter: 'B',
              description: 'Business Software'
            },
            {
              letter: 'C',
              description: 'Database Management Software'
            },
            {
              letter: 'D',
              description: 'Presentation Software'
            },
          ],
          answer: 'A',
        },
        {
          type: 'multiple-choice',
          question: 'It is used for music players, video players, and games.',
          choices: [
            {
              letter: 'A',
              description: 'Business Software'
            },
            {
              letter: 'B',
              description: 'Multimedia Software'
            },
            {
              letter: 'C',
              description: 'Entertainment Software'
            },
            {
              letter: 'D',
              description: 'Presentation Software'
            },
          ],
          answer: 'C',
        },
        {
          type: 'multiple-choice',
          question: 'It allows programming languages such as C++ and Java to write the instructions.',
          choices: [
            {
              letter: 'A',
              description: 'Arithmetic Logic Unit'
            },
            {
              letter: 'B',
              description: 'Software'
            },
            {
              letter: 'C',
              description: 'System Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'B',
        },
        {
          type: 'multiple-choice',
          question: 'It accomplishes the specialized tasks for users.',
          choices: [
            {
              letter: 'A',
              description: 'Software'
            },
            {
              letter: 'B',
              description: 'Application Software'
            },
            {
              letter: 'C',
              description: 'System Software'
            },
            {
              letter: 'D',
              description: 'Operating System'
            },
          ],
          answer: 'B',
        },
        {
          type: 'multiple-choice',
          question: 'Operating System depicted as interface between the application programs and hardware',
          choices: [
            {
              letter: 'A',
              description: 'Operating System'
            },
            {
              letter: 'B',
              description: 'System Software'
            },
            {
              letter: 'C',
              description: 'Application Software'
            },
            {
              letter: 'D',
              description: 'Software'
            },
          ],
          answer: 'A',
        },
        {
          type: 'identification',
          question: 'It hides the ugly details of a computer operations.',
          answer: 'system software',
        },
        {
          type: 'identification',
          question: 'With this, programmers can write programs without knowing the details.',
          answer: 'system software',
        },
        {
          type: 'identification',
          question: 'It controls the execution of the program.',
          answer: 'operating system',
        },
        {
          type: 'identification',
          question: 'Set of instructions that tells what the computer should do.',
          answer: 'software',
        },
        {
          type: 'identification',
          question: 'It manipulates the basic operations (ex. input and output operations).',
          answer: 'system software',
        },
        {
          type: 'identification',
          question: 'It locates free disk space in a hard disk when files need it.',
          answer: 'system software',
        },
        {
          type: 'identification',
          question: 'User does not need to know these processes.',
          answer: 'system software',
        },
        {
          type: 'identification',
          question: 'It accomplishes the specialized tasks for users.',
          answer: 'application software',
        },
        {
          type: 'identification',
          question: 'It is an example of productivity tools, email, photographs, and processors.',
          answer: 'application software',
        },
        {
          type: 'identification',
          question: 'This is an example of word processing software, desktop, publishing software.',
          answer: 'document production software',
        },
        {
          type: 'identification',
          question: 'It creates and manipulates spreadsheet electronically.',
          answer: 'spreadsheet software',
        },
        {
          type: 'identification',
          question: 'It creates and display information in the form of slideshow.',
          answer: 'presentation software',
        },
        {
          type: 'identification',
          question: 'It is used to store, modify, retrieve information from a storage.',
          answer: 'database management software',
        },
        {
          type: 'identification',
          question: 'It is used for business management.',
          answer: 'business software',
        },
        {
          type: 'identification',
          question: 'It is used to manipulate picture, sound, and video.',
          answer: 'multimedia software',
        },
        {
          type: 'identification',
          question: 'It is used for music players, video players, and games.',
          answer: 'entertainment software',
        },
        {
          type: 'enumeration',
          question: 'Enumerate 2 classes of software (2pts).',
          answers: {
            'system software': true,
            'application software': true,
          },
        },
        {
          type: 'enumeration',
          question: 'Enumerate 6 example of operating system (6pts).',
          answers: {
            'window os': true,
            'mac os': true,
            'linux': true,
            'ios': true,
            'android': true,
            'symbian': true,
          },
        },
        {
          type: 'enumeration',
          question: 'Enumerate 5 example of system software (5pts).',
          answers: {
            'os': true,
            'interpreters': true,
            'compilers': true,
            'debugger': true,
            'text editor': true,
          },
        },
        {
          type: 'enumeration',
          question: 'Enumerate 4 components of a computer system (4pts).',
          answers: {
            'user': true,
            'application software': true,
            'operating system': true,
            'hardware': true,
          },
        },
        {
          type: 'enumeration',
          question: 'Enumerate 7 categories of a application software (7pts).',
          answers: {
            'document production software': true,
            'spreadsheet software': true,
            'presentation software': true,
            'database management software': true,
            'business software': true,
            'multimedia software': true,
            'entertainment software': true,
          },
        },
      ]
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