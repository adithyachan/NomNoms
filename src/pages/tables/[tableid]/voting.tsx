import { Table } from "@/types/Table"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { ReadTable } from "@/lib/firebase/table/TableOperations"
import Voting from "@/components/table/restaurantCards/Voting"

export default function RestaurantVoting() {
  const router = useRouter()
  const { tableid } = router.query
  const[table, setTable] = useState<Table>()
  const[votes, setVotes] = useState()

  useEffect(() => {
    if (tableid !== undefined) {
      const unsub = ReadTable(tableid as string, setTable)
      return unsub
    }
  }, [tableid])
  
  
  return (
    <>
      <Voting zip={table?.prefs.zip ?? 10019} prefs={'food'} votes={votes} setVotes={setVotes} table={table}/>
    </>
  )
}