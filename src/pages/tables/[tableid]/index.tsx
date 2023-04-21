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
    const table: ITable = res as ITable
    table.lastAccessed = { seconds: table.lastAccessed.seconds, nanoseconds: table.lastAccessed.nanoseconds }
    table.expiration = { seconds: table.expiration.seconds, nanoseconds: table.expiration.nanoseconds }
    table.date = { seconds: table.date.seconds, nanoseconds: table.date.nanoseconds }
    return { props: { table: table } }
  }
  
  return { props: { table: undefined } }
}

export default function TablePage(props: { table: ITable | undefined }) {
  const router = useRouter()
  const { tableid } = router.query
  const { user } = useUser()
  const [table, setTable] = useState<Table>()

  const updateTable = async () => {
    if (props.table && !props.table.banned.includes(user.uid)) {
      const temp = new Table(props.table)
      temp.lastAccessed = Timestamp.fromDate((new Date()))
      temp.expiration = Timestamp.fromDate(new Date(temp.expiration.toDate().getTime() + 60 * 60 * 24 * 1000))
      if (! Object.keys(temp.users).includes(user?.uid!)) {
        showNotification({
          title: `You're in!`,
          message: `Successfully joined table: ${temp.name}`,
          autoClose: 3000,
          color: 'teal',
          icon: <IconCheck size={16} />,           
        })
        temp.users[user?.uid!] = {};
      }
      await UpdateTable(temp as ITable)
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

    if (props.table) {
      updateTable()
      const unsub = ReadTable(tableid as string, setTable)
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
        <TableSelectedLayout table={ table } />
      </NotificationsProvider>
    </>
  )
}