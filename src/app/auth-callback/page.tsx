'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';
import { trpc } from '../_trpc/client';
import { Spinner } from '@nextui-org/react';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');
    const { data, failureReason } = trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                // user is synced to db
                router.push(origin ? `/${origin}` : `/dashboard`);
            }
            else router.push('/');
        },
        retry: true,
        retryDelay: 500,
    });

    useEffect(() => {
        if (failureReason?.message === 'UNAUTHORIZED') {
            router.push('/');
        }
    }, [failureReason, router])

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Spinner />
                <h3 className='font-semibold text-xl text-center'>
                    Setting up your account...
                </h3>
                <p className='text-center'>You will be redirected automatically.</p>
            </div>
        </div>
    );
}

export default Page;