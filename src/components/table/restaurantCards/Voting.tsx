import CardStack from "@/components/table/restaurantCards/CardStack";
import { useRestaurantListEndpoint } from "@/lib/utils/yelpAPI";
import { Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import FavoritePicker from "@/components/table/restaurantCards/FavoritePicker";
import { useRouter } from "next/router";
import { ReadTable, UpdateTable } from "@/lib/firebase/table/TableOperations";
import { useUser } from "@/providers/AuthProvider";

export default function Voting({ votes, setVotes, table, data }: any) {
  const [state, setState] = useState('stack'); // can be stack, favorite, done
  const { user } = useUser()
  const router = useRouter()

  if (user?.uid && table !== undefined) {
    if (Object.keys(table.users[user.uid]).length !== 0) {
      router.push(`/tables/${router.query.tableid}/results`);
    }
  }
  useEffect(() => {
    if (state === 'complete') {
      const uid = user?.uid;
      if (uid) {
        table.users[uid] = votes;
        table.numDoneVoting++;
        UpdateTable(table);
        router.push(`/tables/${router.query.tableid}/results`);
      }
    }
  }, [state, data]);

  if (state === 'stack') {
    if (!data) {
      return <Loader color="FF5858" />;
    } else {
      const ids = data.map((business: any) => business.id);
      return <CardStack listData={{ businesses: data }} ids={ids} setState={setState} setUserVotes={setVotes}/>;
    }
  } else if (state === 'favorite') {
    let nonZeroVotes = 0
    for (const userid in votes) {
      if (votes[userid] !== 0) {
        nonZeroVotes++;
      }
    }
    if (nonZeroVotes <= 1) {
      setState('complete')
    } else {
      Object.keys(votes).forEach(key => {
        if (votes[key] == 0) {
          delete votes[key]
        }
      })
    }
    let ids: any[] = []
    if (votes) {
      ids = Object.keys(votes)
    } else {
      ids = []
    }
    

    return <FavoritePicker ids={ids} votes={votes} setVotes={setVotes} setState={setState} listData={data}/>
  }
  // } else if (state === 'complete') {
  //   const uid = user.uid
  //   if (uid != null) {
  //     table.users[uid] = votes
  //     let added = false
  //     if (! added) {
  //       table.numDoneVoting++
  //       added = true
  //     }
  //   }
  //   UpdateTable(table)
  //   // router.push('/voting/results')
  //   router.push(`/tables/${router.query.tableid}/results`);
  // }
    // votes variable should be sent to database somewhere to be aggregated along with others' votes
    // user should be redirected to waiting page
  
  return <></>
}