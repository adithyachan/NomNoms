import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid, Title } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";

export default function TableSelectedLayout(props: {table: Table}) {
  return (
    <Container fluid>
      {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
      <Grid>
        <Grid.Col span={3}>
          <TablePrefSidebar table={props.table} />
        </Grid.Col>
        <Grid.Col span={6}>
          <RestaurantListLayout table={props.table} />
        </Grid.Col>
        <Grid.Col span={3}>
          <TableUserSidebar table={props.table} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}