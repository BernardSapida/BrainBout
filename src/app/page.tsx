import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

import styles from '@/tw-styles/main';

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1>Main Page</h1>
    </main>
  )
}
