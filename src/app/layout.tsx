import '@/css/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppProviders from './providers'
import Nav from '@/components/general/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Analytics } from '@vercel/analytics/react';

import KindeAuth from '@/components/general/KindeAuth'
import Logout from '@/components/general/Logout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrainBout',
  description: 'BrainBout is your trusted study companion designed to help you excel in all your subjects. Whether you are gearing up for a challenging math exam, a history quiz, or any other subject, we have got you covered.',
  openGraph: {
    type: "website",
    url: "https://brainbout.vercel.app",
    title: "BrainBout",
    description: "BrainBout is your trusted study companion designed to help you excel in all your subjects. Whether you are gearing up for a challenging math exam, a history quiz, or any other subject, we have got you covered.",
    siteName: "BrainBout",
    images: [{
      url: "./assets/image/brainbout.png",
    }],
  },
  metadataBase: new URL("https://brainbout.vercel.app")
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = await getUser();

  return (
    <html lang="en" className='text-foreground bg-background dark'>
      <link rel="icon" href="/brainbout.ico" sizes="any" />
      <body className={inter.className}>
        <AppProviders>
          <Nav
            isAuthenticated={authenticated}
            KindeAuth={<KindeAuth />}
            Logout={<Logout />}
            user={user}
          />
          {children}
          <Analytics />
        </AppProviders>
      </body>
    </html>
  )
}
