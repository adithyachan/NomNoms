// Next Imports
import { useRouter } from "next/router";

// Firestore Imports
import { ReadTable, ReadTables, UpdateTable } from "@/lib/firebase/table/TableOperations";


// Layouts
import TableSelectedLayout from "@/layouts/table/tableSelected/TableSelectedLayout";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect, useState } from "react";
import { useUser } from "@/providers/AuthProvider";
import { ITable, Table } from "@/types/Table";
import { Timestamp } from "firebase/firestore";

export default function TablePage() {
  const router = useRouter()
  const { tableid } = router.query
  const { user } = useUser()
  const [table, setTable] = useState<Table>()
  const [tables, setTables] = useState<Table[]>()

  const updateTable = async () => {
    if (table) {
      console.log(((new Date()).getTime() - table.lastAccessed.toDate().getTime()) / 1000)
      table.lastAccessed = Timestamp.fromDate((new Date()))
      table.expiration = Timestamp.fromDate(new Date(table.expiration.toDate().getTime() + 60 * 60 * 24 * 1000))
      if (!table.users.includes(user.uid!)) {
        table.users.push(user.uid!)
      }
      await UpdateTable(table as ITable)
    } 
  }

  useEffect(() => {
    if (!user.uid && !user.loading) {
      router.push("/auth/register")
    }
    
    if (!tables) {
      const unsubTables = ReadTables(setTables)
      return unsubTables
    }
    else {
      if (tables?.map((table) => table.id).includes(tableid as string)) {
        if (!table) {
          const unsub = ReadTable(tableid as string, setTable)
        }
        else if (((new Date()).getTime() - table.lastAccessed.toDate().getTime()) / 1000 > 2) {
          updateTable()
        }
      }
      else {
        router.push("/tables/tablenotfound")
      }
    }
  }, [tables, table, user, tableid])

  // Check if page is loaded yet
  if (!table) {
    return <LoadingLayout fullscreen logo/>;
  }

  return <TableSelectedLayout table={ table }/>
}