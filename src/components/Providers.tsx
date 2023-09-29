import { FunctionComponent, ReactNode, useState } from 'react';

import { trpc } from '@/app/_trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

interface ProvidersProps {
    children: ReactNode
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: `http://localhost:3000/api/trpc`,
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