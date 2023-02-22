import LandingLayout from '@/layouts/LandingLayout'
import Head from 'next/head'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/JoinTable'
<<<<<<< HEAD
import {GetRestaurants, GetRestaurant} from '@/lib/utils/yelpAPI'
import RenderImage from '@/components/table/restaurantCards/Image'
=======
import {useRestaurantBusinessEndpoint, useRestaurantListEndpoint} from '@/lib/utils/yelpAPI'
import LandingLayout from '@/layouts/LandingLayout'
>>>>>>> 9da8de5 (Refactored utility file for API)
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
<<<<<<< HEAD
<<<<<<< HEAD

        <LandingLayout />
=======
        <p>NomNoms</p>
        <JoinTable />
        <RenderImage url ="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" name = "Scenery"/>
        {/* <GetRestaurants zip="10019" radius="8000" categories="japanese"/> */}
        <GetRestaurant id="TN4RnyqHMSupRFot4Q-_EA"/>
>>>>>>> ef9675a (finished testing api call)
=======
        <LandingLayout/>
        
>>>>>>> 9da8de5 (Refactored utility file for API)
      </main>
    </>
  )
}
