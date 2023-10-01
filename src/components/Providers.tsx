import { FunctionComponent, ReactNode, useState } from 'react';

import { trpc } from '@/app/_trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { absoluteUrl } from '@/lib/utils';

interface ProvidersProps {
    children: ReactNode
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: absoluteUrl("/api/trpc"),
            }),
        ],
    }));

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default Providers;