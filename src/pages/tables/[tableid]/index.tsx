// Next Imports
import { useRouter } from "next/router";

// Firestore Imports
import { ReadTable, UpdateTable } from "@/lib/firebase/table/TableOperations";
import { ReadDocument } from "@/lib/firebase/FirestoreOperations";


// Layouts
import TableSelectedLayout from "@/layouts/table/tableSelected/TableSelectedLayout";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect, useState } from "react";
import { useUser } from "@/providers/AuthProvider";
import { ITable, Table } from "@/types/Table";
import { Timestamp } from "firebase/firestore";

import { NotificationsProvider, showNotification } from "@mantine/notifications";

import { IconCheck } from "@tabler/icons-react";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const tableid = context.params?.tableid
  const res = (await ReadDocument("tables", tableid as string))
  
  if (res) {
    return { props: { tableExists: true } }
  }
  
  return { props: { tableExists: false } }
}

export default function TablePage(props: { tableExists: boolean}) {
  const router = useRouter()
  const { tableid } = router.query
  const { user } = useUser()
  const [table, setTable] = useState<Table>()

  const updateTable = async () => {
    if (table) {
      table.lastAccessed = Timestamp.fromDate((new Date()))
      table.expiration = Timestamp.fromDate(new Date(table.expiration.toDate().getTime() + 60 * 60 * 24 * 1000))
      if (! Object.keys(table.users).includes(user?.uid!)) {
        showNotification({
          title: `You're in!`,
          message: `Successfully joined table: ${table.name}`,
          autoClose: 3000,
          color: 'teal',
          icon: <IconCheck size={16} />,           
        })
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

    if (props.tableExists) {
      const unsub = ReadTable(tableid as string, setTable)
      updateTable()
      return unsub
    }
  }, [user])

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