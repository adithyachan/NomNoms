import { AppShell, Container, Grid, Header, Text, Menu, Button } from "@mantine/core";
import CreateJoinTableLayout from "./CreateJoinTableLayout";
import UserTablesLayout from "./UserTablesLayout";
import NavBar from "@/components/NavBar";
import { UseAuth } from "@/lib/firebase/auth/AuthProvider";
import HeaderTabs from "@/components/NavBar";


export default function TableSelectionLayout() {

  return (
    <Container fluid className="bg-gradient-to-b from-rose-100 to-white">
      <AppShell>
      <NavBar user={UseAuth()}>

      </NavBar>
      <Grid>
        <Grid.Col span={12} md={6}>
          <CreateJoinTableLayout />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <UserTablesLayout />
        </Grid.Col>
      </Grid>
      </AppShell>
    </Container>

  )
}