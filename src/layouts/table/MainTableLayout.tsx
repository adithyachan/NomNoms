import TablePrefSidebar from "@/components/table/TablePrefSidebar";
import TableUserSidebar from "@/components/table/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";

export default function MainTableLayout(props: {table: Table}) {
  return (
    <Container fluid>
      {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
      <Grid>
        <Grid.Col span={3}>
          <TablePrefSidebar />
        </Grid.Col>
        <Grid.Col span={6}>
          <RestaurantListLayout />
        </Grid.Col>
        <Grid.Col span={3}>
          <TableUserSidebar />
        </Grid.Col>
      </Grid>
    </Container>
  );
}