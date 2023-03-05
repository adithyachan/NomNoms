// Next Imports
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultErrorPage from "next/error"

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
  const [valid, setValid] = useState(false)
  const [table, setTable] = useState<Table>()
  const [tables, setTables] = useState<Table[]>()

  useEffect(() => {
    if (!user.uid) {
      router.push("/auth/register")
    }
    
    if (!tables) {
      const unsubTables = ReadTables(setTables)
      return unsubTables
    }
    else {
      if (tables?.map((table) => table.id).includes(tableid as string)) {
        try {
          const unsub = ReadTable(tableid as string, setTable)
          setValid(true)
          return () => {
            unsub()
            if (table) {
              table.lastAccessed = Timestamp.fromDate((new Date()))
              table.expiration = Timestamp.fromDate(new Date(table.expiration.toDate().getTime() + 60 * 60 * 24 * 1000))
              if (user) {
                table.users.push(user.uid!)
              }
              UpdateTable(table as ITable)
            }
          }
        }
        catch (err) {
          setValid(false)
        }
      }
      else {
        router.push("/tables/tablenotfound")
      }
    }
  }, [tables, user, tableid])

  // Check if page is loaded yet
  if (!table) {
    return <LoadingLayout fullscreen logo/>;
  }

  return <TableSelectedLayout table={ table }/>
}