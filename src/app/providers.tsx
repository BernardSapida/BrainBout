'use client'

import { FunctionComponent, ReactNode } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from 'next-themes';
import Providers from '@/components/Providers';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface AppProvidersProps {
    children: ReactNode
}

const AppProviders: FunctionComponent<AppProvidersProps> = ({ children }) => {
    return (
        <Providers>
            <ThemeProvider attribute="class">
                <NextUIProvider>
                    {children}
                    <ProgressBar
                        height="2px"
                        color="#0070F0"
                        options={{ showSpinner: false }}
                        shallowRouting
                    />
                </NextUIProvider>
            </ThemeProvider>
        </Providers>
    );
}

export default AppProviders;