'use client'

import { FunctionComponent, useEffect, useState } from 'react';

import Form from '@/components/leaderboard/Form';

import styles from '@/tw-styles/main';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Spinner } from '@nextui-org/react';
import { getLeaderboard } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Leaderboard[]>();
  const subject = searchParams.get('subject');

  useEffect(() => {
    setLoading(true);

    if (subject) {
      getLeaderboard(subject).then((leaderboard) => setData(leaderboard.data));
    }

    setLoading(false);
  }, [subject]);

  return (
    <main className={styles.main}>
      <Form />
      {
        searchParams.get('subject') && (
          <Table removeWrapper className='mt-5 max-w-md mx-auto w-full' aria-label="Leaderboard table">
            <TableHeader>
              <TableColumn>User</TableColumn>
              <TableColumn>Score</TableColumn>
            </TableHeader>
            <TableBody
              loadingContent={<Spinner />}
              isLoading={loading}
              emptyContent={"No leaderboard to display."}
              aria-label='Leaderboard table'
            >
              {
                data?.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <User
                        name={`${user.User.given_name} ${user.User.family_name}`}
                        description={user.User.email}
                        avatarProps={{
                          src: `${user.User.picture}`
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.score}</TableCell>
                  </TableRow>
                )) as any
              }
            </TableBody>
          </Table>
        )
      }
    </main>
  );
}

export default Page;