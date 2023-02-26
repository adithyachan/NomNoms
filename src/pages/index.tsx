import Head from 'next/head'
import { useState } from 'react'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/JoinTable'
import {useRestaurantBusinessEndpoint, useRestaurantListEndpoint} from '@/lib/utils/yelpAPI'
import LandingLayout from '@/layouts/LandingLayout'
import ShowCard from '@/components/table/restaurantCards/Card'
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
        <p>NomNoms</p>
<<<<<<< Updated upstream
        <TestListHook /> <br />
        <TestBusinessHook />
        {/* <RenderImage url ="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg" name = "Scenery"/> */}
        {/* <GetRestaurants zip="10019" radius="8000" categories="japanese"/> */}
=======
        <JoinTable />
        <ShowCard name='restaurant' url= 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80' id = "qY1o1MhoRyN84RRhUJtvpQ" />
        {/* <GetRestaurants zip="10019" radius="8000" categories="japanese"/> */}
        {/*<GetRestaurant id="TN4RnyqHMSupRFot4Q-_EA"/> */}
        
>>>>>>> Stashed changes
      </main>
    </>
  )
}
