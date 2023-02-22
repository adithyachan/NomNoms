import LandingLayout from '@/layouts/LandingLayout'
import Head from 'next/head'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/JoinTable'
import {GetRestaurants, GetRestaurant} from '@/lib/utils/yelpAPI'
import RenderImage from '@/components/table/restaurantCards/Image'
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
<<<<<<< HEAD

        <LandingLayout />
=======
        <p>NomNoms</p>
        <JoinTable />
        <RenderImage url ="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" name = "Scenery"/>
        {/* <GetRestaurants zip="10019" radius="8000" categories="japanese"/> */}
        <GetRestaurant id="TN4RnyqHMSupRFot4Q-_EA"/>
>>>>>>> ef9675a (finished testing api call)
      </main>
    </>
  )
}
