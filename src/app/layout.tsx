import '@/css/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppProviders from './providers'
import Nav from '@/components/general/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import KindeAuth from '@/components/general/KindeAuth'
import Logout from '@/components/general/Logout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrainBout',
  description: 'BrainBout created by Bernard Sapida',
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
      <body className={inter.className}>
        <AppProviders>
          <Nav
            isAuthenticated={authenticated}
            KindeAuth={<KindeAuth />}
            Logout={<Logout />}
            user={user}
          />
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
