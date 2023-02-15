import Head from 'next/head'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/jointable'
export default function Home() {
  // start up firebase
  const app = useFirebaseApp()

  return (
    <>
      <Head>
        <title>NomNoms</title>
        <meta name="description" content="Helping dysfunctional groups since 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* TODO: Create Basic Landing */}
        <p>NomNoms</p>
        <JoinTable />
      </main>
    </>
  )
}
