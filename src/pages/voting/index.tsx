import CardStack from "@/components/table/restaurantCards/CardStack";
import { useRestaurantListEndpoint } from "@/lib/utils/yelpAPI";
import { Loader } from "@mantine/core";
import { useState } from "react";
import FavoritePicker from "@/components/table/restaurantCards/FavoritePicker";
import { useRouter } from "next/router";

export default function Voting() {
  const [state, setState] = useState('stack'); // can be stack, favorite, done
  const [votes, setVotes] = useState();
  const { data: listData, error: listError, isLoading: listIsLoading } = useRestaurantListEndpoint(10, "10019", 3200, 'japanese,mexican');
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
  } 
    // votes variable should be sent to database somewhere to be aggregated along with others' votes
    // user should be redirected to waiting page
  router.push('/voting/results')
  
}