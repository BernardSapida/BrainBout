'use client'

import { FunctionComponent, ReactNode } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from 'next-themes';
import Providers from '@/components/Providers';

interface AppProvidersProps {
    children: ReactNode
}

const AppProviders: FunctionComponent<AppProvidersProps> = ({ children }) => {
    return (
        <Providers>
            <ThemeProvider attribute="class">
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </ThemeProvider>
        </Providers>
    );
}

export default AppProviders;