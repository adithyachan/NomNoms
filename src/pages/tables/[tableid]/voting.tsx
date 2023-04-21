import { Table } from "@/types/Table"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { ReadTable } from "@/lib/firebase/table/TableOperations"
import Voting from "@/components/table/restaurantCards/Voting"

export default function RestaurantVoting() {
  const router = useRouter()
  const { tableid } = router.query
  const [table, setTable] = useState<Table>()
  const [votes, setVotes] = useState()
  const [data, setData] = useState<any[]>()

  useEffect(() => {
    if (tableid !== undefined && !table) {
      ReadTable(tableid as string, setTable)
    }
    else if (table) {
      let temp = table.restaurantList
      let cuisine = table.prefs.cuisine.split(",")
      if (cuisine.includes('food')) cuisine.splice(cuisine.indexOf('food'))
      let price = table.prefs.price.replace(" ", "").split(",").map(i => parseInt(i)).filter(i => !Number.isNaN(i))

      if (cuisine) {
        if (cuisine.length != 0) {
          temp = temp.filter(item => {
            const categories = item.categories.map((i: any) => i.title);
            return cuisine.some(c => categories.includes(c));
          });
        }
      }


      if (price) {
        const min = price[0]
        const max = price[price.length - 1]

        temp = temp.filter((item) => {
          const itemPrice = item.price ? item.price.length : 4
          return itemPrice >= min && itemPrice <= max
        })
      }
      setData(temp)
    }
  }, [tableid, table])

  return (
    <>
      {table ? (
        <Voting
          zip={table.prefs.zip}
          prefs={table.prefs.cuisine}
          votes={votes}
          setVotes={setVotes}
          table={table}
          price={table.prefs.price}
          data={data?.slice(0, 10)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}