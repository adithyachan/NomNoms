import { useRouter } from "next/router";
import { ReadTable } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";
import { useState, useEffect } from "react";
import ShowCard from "@/components/table/restaurantCards/Card";
import { Text, Center } from "@mantine/core";
import { Button, Image } from "@mantine/core";
export default function ResultsPage() {
  const router = useRouter()
  const { tableid } = router.query
  const[table, setTable] = useState<Table>()
  // const[dots, setDots] = useState('.')

  const HandleDone = () => {
    router.push(`/tables/${router.query.tableid}`)
  }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (dots === '.') {
  //       setDots('..');
  //     } else if (dots === '..') {
  //       setDots('...');
  //     } else {
  //       setDots('.');
  //     }
  //   }, 500);

  //   return () => clearInterval(intervalId);
  // }, [dots]);

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

      // const topRestaurantIDs = Object.entries(totalVotes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(pair => pair[0])
      const topRestaurantIDs = Object.entries(totalVotes)
        .filter(pair => pair[1] !== 0) // remove key-value pairs where value is 0
        .sort((a, b) => {
          if (b[1] === a[1]) {
            return a[0].localeCompare(b[0]); // lexicographically sort based on key
          }
          return b[1] - a[1]; // sort based on value
        })
        .slice(0, 3)
        .map(pair => pair[0]);
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
              paddingBottom: '20px'
            }}
          >
            {topRestaurantIDs.length > 0 ?
              (topRestaurantIDs.map((id: string) => (
                <ShowCard
                  key={id}
                  id={id}
                />
                )))
              :
              (<>
                {'No one voted for anything :('}
              </>)

            }
          </div>
          <Button color="red" onClick={HandleDone}>
            Finish
          </Button>
        </Center>
        
      
      )
      
    } else {
      // show waiting page
      return (
        <Center className="flex-col rounded-3xl bg-white shadow-red-100 shadow-xl p-10 m-10">
          <Text style={{padding: '40px'}} className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>
            Waiting for your table mates to finish voting {`(${table.numDoneVoting}/${Object.keys(table.users).length})...`}
          </Text>
          <Image maw={240} mx="auto" radius="md" src="/images/burger.png" alt="Waiting image" />
        </Center>
          

        
      )
      
    }
  } else {
    return (
      <>
      </>
    )
  }

}