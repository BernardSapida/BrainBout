'use client'

import { FunctionComponent, useEffect, useState } from 'react';

import Form from '@/components/leaderboard/Form';

import styles from '@/tw-styles/main';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Spinner, Chip } from '@nextui-org/react';
import { getLeaderboard } from '@/lib/data';
import { useSearchParams } from 'next/navigation';
import { getNumberWithOrdinal, rankChipColor } from '@/lib/utils';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Leaderboard[]>();
  const subject = searchParams.get('subject');

  useEffect(() => {
    setLoading(true);

    if (subject) {
      getLeaderboard(subject)
        .then((leaderboard) => {
          setData(leaderboard.data);
        })
        .finally(() => {
          setLoading(false)
        });
    }
  }, [subject]);

  return (
    <main className={styles.main}>
      <Form />
      {
        searchParams.get('subject') && (
          <Table
            className='mt-5 max-w-md mx-auto w-full'
            aria-label="Leaderboard table"
          >
            <TableHeader>
              <TableColumn>Rank</TableColumn>
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
                data?.map((user, index: number) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Chip color={rankChipColor(index)} variant='faded' size='sm'>{getNumberWithOrdinal(index + 1)}</Chip>
                    </TableCell>
                    <TableCell>
                      <User
                        name={`${user.User?.given_name} ${user.User.family_name || ''}`}
                        description={user.User.email}
                        avatarProps={{
                          src: `${user.User.picture || 'https://res.cloudinary.com/dwwdihklx/image/upload/v1695957223/display-pictures/t77vrr2xn7pdz5vukzjk.jpg'}`
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.score}/58</TableCell>
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