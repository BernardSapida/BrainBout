import Wrapper from '@/components/Wrapper';
import styles from '@/tw-styles/main';

export default async function Home() {
  return (
    <main className={styles.main}>
      <Wrapper>
        <div className='mt-24 flex items-center'>
          <div>
            <h1 className='text-4xl md:text-6xl font-bold'>Welcome to BrainBout</h1>
            <p className='text-4xl md:text-6xl font-bold mb-10'>Your Ultimate Reviewer!</p>
            <p className='text-base sm:text-xl'>Are you ready to supercharge your study sessions and ace those quizzes and exams? Look no further than BrainBout - your one-stop destination for comprehensive subject reviews and timed practice tests.</p>
          </div>
        </div>
      </Wrapper>
    </main >
  )
}
