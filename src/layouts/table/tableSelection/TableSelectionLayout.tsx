import { Container, Grid } from "@mantine/core";
import CreateJoinTableLayout from "./CreateJoinTableLayout";
import UsersTablesLayout from "./UsersTablesLayout";


export default function TableSelectionLayout() {
  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={6}>
          <UsersTablesLayout />
        </Grid.Col>
        <Grid.Col span={6}>
          <CreateJoinTableLayout />
        </Grid.Col>
      </Grid>
    </Container>
  )
}