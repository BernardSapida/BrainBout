'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';
import { trpc } from '../_trpc/client';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');
    const { data } = trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                // user is synced to db
                router.push(origin ? `/${origin}` : `/dashboard`);
            }
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                router.push('/');
            }
        },
        retry: true,
        retryDelay: 500
    });

    return (
        <div>
            <h1>Setting up your account...</h1>
        </div>
    );
}

export default Page;