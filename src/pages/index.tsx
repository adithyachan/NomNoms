import LandingLayout from '@/layouts/LandingLayout'
import Head from 'next/head'
import { useState } from 'react'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/JoinTable'
<<<<<<< HEAD
import {GetRestaurants, GetRestaurant} from '@/lib/utils/yelpAPI'
import RenderImage from '@/components/table/restaurantCards/Image'
=======
import {useRestaurantBusinessEndpoint, useRestaurantListEndpoint} from '@/lib/utils/yelpAPI'
import LandingLayout from '@/layouts/LandingLayout'
<<<<<<< HEAD
>>>>>>> 9da8de5 (Refactored utility file for API)
=======
import ShowCard from '@/components/table/restaurantCards/Card'
>>>>>>> 2f23212 (fixing conflicts)
export default function Home() {
  // start up firebase
  const app = useFirebaseApp()
  const {data: listData, error: listError, isLoading: isLoadingList} = useRestaurantListEndpoint(10019, 3200, "japanese%2Cchinese")
  const {data: businessData, error: businessError, isLoading: isLoadingBusiness} = useRestaurantBusinessEndpoint("TN4RnyqHMSupRFot4Q-_EA")

  function TestListHook() {
    
    if (listData) return <>List loaded successfully</>
    if (listError) return <>Error loading list</>
    else return <>Loading list...</>
    
  }

  function TestBusinessHook() {
    if (businessData) return <>Business loaded successfully</>
    if (businessError) return <>Error loading business</>
    else return <>Loading business...</>
  }
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
        <TestListHook /> <br />
        <TestBusinessHook />
        {/* <RenderImage url ="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" name = "Scenery"/> */}
        {/* <GetRestaurants zip="10019" radius="8000" categories="japanese"/> */}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <GetRestaurant id="TN4RnyqHMSupRFot4Q-_EA"/>
>>>>>>> ef9675a (finished testing api call)
=======
        <LandingLayout/>
        
>>>>>>> 9da8de5 (Refactored utility file for API)
=======
>>>>>>> 1cca32b (Fixed custom API hooks)
=======
=======
=======
>>>>>>> 30c8b81 (Fixed loading screen, extracted information from api call, improved card design)
        <JoinTable />
        <ShowCard id = "pcb8yK9_28uWz5CyokjwSg" />
        {/* <GetRestaurants zip="10019" radius="8000" categories="japanese"/> */}
        {/*<GetRestaurant id="TN4RnyqHMSupRFot4Q-_EA"/> */}
        
<<<<<<< HEAD
>>>>>>> Stashed changes
>>>>>>> 2f23212 (fixing conflicts)
=======
>>>>>>> 30c8b81 (Fixed loading screen, extracted information from api call, improved card design)
      </main>
    </>
  )
}
