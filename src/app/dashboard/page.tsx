import { FunctionComponent } from 'react';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import Form from '@/components/dashboard/Form';

import styles from '@/tw-styles/main';
import { redirect } from 'next/navigation';
import { db } from '@/db';

interface PageProps { }

const Page: FunctionComponent<PageProps> = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  })

  if (!dbUser) redirect('/auth-callback?origin=dashboard')

  return (
    <main className={styles.main}>
      <h1 className='text-center my-5'>Choose a subject</h1>
      <Form />
    </main>
  );
}

export default Page;