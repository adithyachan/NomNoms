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
import NavBar from "@/components/NavBar";
import { Container } from "@mantine/core";
import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import { Grid } from "@mantine/core";
import RestaurantListIndividualLayout from "@/layouts/table/tableSelected/RestaurantListIndividualLayout";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { NotificationsProvider, showNotification } from "@mantine/notifications";

import { IconCheck } from "@tabler/icons-react";

export default function TablePage(props: {table: Table}) {
  const router = useRouter()
  const { tableid } = router.query
  const { user } = useUser()
  const [table, setTable] = useState<Table>()
  const [tables, setTables] = useState<Table[]>()


  // Check if page is loaded yet
  // if (!table) {
    // return <LoadingLayout fullscreen logo/>;
  // }

  return (
    <>
    <>
      <NavBar>
      </NavBar>
    <Container fluid className="p-10 bg-gradient-to-b from-rose-100 to-white">
      {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
      <Grid>
        <Grid.Col span="auto">
          <TablePrefSidebar table={props.table} />
        </Grid.Col>
        <Grid.Col span={5}>
          <RestaurantListIndividualLayout table={props.table} />
        </Grid.Col>
      </Grid>
    </Container>
    </>
  
    </>
  )
}