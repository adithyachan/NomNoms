import { Table } from "@/types/Table"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { ReadTable } from "@/lib/firebase/table/TableOperations"
import Voting from "@/components/table/restaurantCards/Voting"
import NavBar from "@/components/NavBar"
import { Container, Grid } from "@mantine/core"

export default function RestaurantVoting() {
  const router = useRouter()
  const { tableid } = router.query
  const [table, setTable] = useState<Table>()
  const [votes, setVotes] = useState()

  useEffect(() => {
    if (tableid !== undefined) {
      ReadTable(tableid as string, setTable)
    }
  }, [tableid])

  return (
    <>
    <NavBar>
      
    </NavBar>
 
      {table ? (
        <Voting
          zip={table.prefs.zip}
          prefs={table.prefs.cuisine}
          votes={votes}
          setVotes={setVotes}
          table={table}
          price={table.prefs.price}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
