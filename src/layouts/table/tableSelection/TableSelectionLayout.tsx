import { Container, Grid } from "@mantine/core";
import CreateJoinTableLayout from "./CreateJoinTableLayout";
import UserTablesLayout from "./UserTablesLayout";

export default function TableSelectionLayout() {
  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={6}>
          <UserTablesLayout />
        </Grid.Col>
        <Grid.Col span={6}>
          <CreateJoinTableLayout />
        </Grid.Col>
      </Grid>
    </Container>
  )
}