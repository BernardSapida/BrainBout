import { FunctionComponent } from 'react';

import Form from '@/components/dashboard/Form';

import styles from '@/tw-styles/main';

interface PageProps { }

const Page: FunctionComponent<PageProps> = async () => {
  return (
    <main className={styles.main}>
      <h1 className='text-center my-5'>Choose a subject</h1>
      <Form />
    </main>
  );
}

export default Page;