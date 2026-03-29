'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as RollbarProvider } from '@rollbar/react';
import { useState } from 'react';
import { clientConfig } from '@/rollbar';

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minuto la data se considera fresca
                        refetchOnWindowFocus: false, // No recargar si cambias de pestaña
                    },
                },
            })
    );

    return (
        <RollbarProvider config={clientConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </RollbarProvider>
    );
}