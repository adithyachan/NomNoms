import Head from 'next/head'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/JoinTable'
import {useRestaurantBusinessEndpoint, useRestaurantListEndpoint} from '@/lib/utils/yelpAPI'
import LandingLayout from '@/layouts/LandingLayout'
export default function Home() {
  // start up firebase
  const app = useFirebaseApp()
  const restaurantList = useRestaurantListEndpoint(10019, 3200, "japanese%2Cchinese")
  const restaurant = useRestaurantBusinessEndpoint("TN4RnyqHMSupRFot4Q-_EA")
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
        <LandingLayout/>
        
      </main>
    </>
  )
}
