import CardStack from "@/components/table/restaurantCards/CardStack";
import { useRestaurantListEndpoint } from "@/lib/utils/yelpAPI";
import { Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import FavoritePicker from "@/components/table/restaurantCards/FavoritePicker";
import { useRouter } from "next/router";
import { ReadTable, UpdateTable } from "@/lib/firebase/table/TableOperations";
import { useUser } from "@/providers/AuthProvider";

export default function Voting({zip, prefs, votes, setVotes, table}: any) {
  const [state, setState] = useState('stack'); // can be stack, favorite, done
  const { user } = useUser()
  const { data: listData, error: listError, isLoading: listIsLoading } = useRestaurantListEndpoint(10, zip, 3200, prefs);
  const router = useRouter()
  if (state === 'stack') {
    if (listError) {
      return <>Error loading restaurants</>;
    }
    if (listIsLoading) {
      return <Loader color="FF5858" />;
    } else {
      const ids = listData.businesses.map((business: any) => business.id);
      return <CardStack listData = {listData} ids={ids} setState={setState} setUserVotes={setVotes}/>;
    }
  } else if (state === 'favorite') {

    let ids: any[] = []
    if (votes) {
      ids = Object.keys(votes)
    } else {
      ids = []
    }
    if (ids.length <= 1) {
      setState('complete')
    }

    return <FavoritePicker ids={ids} votes={votes} setVotes={setVotes} setState={setState} listData={listData.businesses}/>
  } else if (state === 'complete') {
    const uid = user.uid
    if (uid != null) {
      table.users[uid] = votes
    }
    UpdateTable(table)
    router.push('/voting/results')
  }
    // votes variable should be sent to database somewhere to be aggregated along with others' votes
    // user should be redirected to waiting page
  
  return <></>
}