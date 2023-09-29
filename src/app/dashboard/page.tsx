import { FunctionComponent } from 'react';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import Form from '@/components/dashboard/Form';

import styles from '@/tw-styles/main';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <main className={styles.main}>
      <h1 className='text-center my-5'>Choose a subject</h1>
      <Form />
    </main>
  );
}

export default Page;