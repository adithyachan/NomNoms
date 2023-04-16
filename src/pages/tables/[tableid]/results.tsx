import { useRouter } from "next/router";
import { ReadTable } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";
import { useState, useEffect } from "react";
import ShowCard from "@/components/table/restaurantCards/Card";
import { Text, Center } from "@mantine/core";

export default function ResultsPage() {
  const router = useRouter()
  const { tableid } = router.query
  const[table, setTable] = useState<Table>()

  useEffect(() => {
    if (tableid !== undefined) {
      const unsub = ReadTable(tableid as string, setTable)
      return unsub
    }
  }, [tableid])

  if (table !== undefined) {
    if (table.numDoneVoting >= Object.keys(table.users).length) {
      // show results
      let totalVotes: { [key: string]: number } = {}

      for (const user of Object.values(table.users)) {
        for (const [restaurantID, value] of Object.entries(user)) {
          totalVotes[restaurantID] = (totalVotes[restaurantID] || 0) + value
        }
      }

      const topRestaurantIDs = Object.entries(totalVotes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(pair => pair[0])
          
      console.log(totalVotes)
      return (
        <Center className="flex-col rounded-3xl bg-white shadow-red-100 shadow-xl p-10 m-10">
          <Text ta="center" className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Results</Text>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {topRestaurantIDs.map((id: string) => (
              <ShowCard
                key={id}
                id={id}
              />
            ))}
          </div>
        </Center>
      
      )
      
    } else {
      // show waiting page
      return (
        
          <Text style={{paddingTop: '40px'}} ta="center" className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>
            Waiting for your table mates to finish voting {`(${table.numDoneVoting}/${Object.keys(table.users).length})`}
          </Text>
        
      )
      
    }
  } else {
    return (
      <>
        {/* There was an error loading the results page for table {router.query.tableid}. */}
        Loading...
      </>
    )
  }

}