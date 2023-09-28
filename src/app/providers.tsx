'use client'

import { FunctionComponent, ReactNode } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
    children: ReactNode
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider attribute="class">
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThemeProvider>
    );
}

export default Providers;