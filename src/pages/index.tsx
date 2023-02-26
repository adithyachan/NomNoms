import Head from 'next/head'
import { useState } from 'react'
import { useFirebaseApp } from '../lib/firebase/hooks/useFirebase'
import JoinTable from '@/components/table/JoinTable'
import GetRestaurants from '@/lib/utils/yelpAPI'
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
<<<<<<<<< Temporary merge branch 1
        <p>NomNoms</p>
        <JoinTable />
        <GetRestaurants zip="10019" radius="8000" categories="japanese"/>
=========
        <LandingLayout />
>>>>>>>>> Temporary merge branch 2
      </main>
    </>
  )
}
