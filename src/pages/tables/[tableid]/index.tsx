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

import { NotificationsProvider, showNotification } from "@mantine/notifications";

import { IconCheck } from "@tabler/icons-react";

export default function TablePage() {
  const router = useRouter()
  const { tableid } = router.query
  const { user } = useUser()
  const [table, setTable] = useState<Table>()
  const [tables, setTables] = useState<Table[]>()

  const updateTable = async () => {
    if (table) {
      table.lastAccessed = Timestamp.fromDate((new Date()))
      table.expiration = Timestamp.fromDate(new Date(table.expiration.toDate().getTime() + 60 * 60 * 24 * 1000))
      // if (!table.users.includes(user.uid!)) {
      if (! Object.keys(table.users).includes(user?.uid!)) {
        showNotification({
          title: `You're in!`,
          message: `Successfully joined table: ${table.name}`,
          autoClose: 3000,
          color: 'teal',
          icon: <IconCheck size={16} />,           
        })
        // table.users.push(user.uid!)
        table.users[user?.uid!] = {};
      }
      await UpdateTable(table as ITable)
    } 
  }

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    else if (user.user == "loading") {
      return
    }
    else if (!(user?.isAnonymous) && (user?.providerData[0].providerId == "password") && !user?.emailVerified) {
      router.push("/auth/verification")
    }

    if (!tables) {
      ReadTables(setTables)
    }
    else {
      if (tables.map((table) => table.id).includes(tableid as string)) {
        if (!table) {
          ReadTable(tableid as string, setTable)
        }
        else if (table.banned && table.banned.includes(user?.uid!)) {
          router.push("/tables/tablenotfound")
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

  return (
    <>
      <NotificationsProvider>
        <TableSelectedLayout table={ table }/>
      </NotificationsProvider>
    </>
  )
}