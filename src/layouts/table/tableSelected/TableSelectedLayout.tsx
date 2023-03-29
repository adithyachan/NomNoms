import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid, Title } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";
import NavBar from "@/components/NavBar";
import { NotificationsProvider } from "@mantine/notifications";

export default function TableSelectedLayout(props: {table: Table}) {
  return (
    <>
    <NotificationsProvider>
      <NavBar>
      </NavBar>
    <Container fluid className="p-10 bg-gradient-to-b from-rose-100 to-white">
      {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
      <Grid>
        <Grid.Col span="auto">
          <TablePrefSidebar table={props.table} />
        </Grid.Col>
        <Grid.Col span={5}>
          <RestaurantListLayout table={props.table} />
        </Grid.Col>
        <Grid.Col span="auto">
          <TableUserSidebar table={props.table} />
        </Grid.Col>
      </Grid>
    </Container>
    </NotificationsProvider>
    </>
  );
}