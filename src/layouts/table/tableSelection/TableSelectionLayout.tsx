import { Container, Grid } from "@mantine/core";
import CreateJoinTableLayout from "./CreateJoinTableLayout";
import UserTablesLayout from "./UserTablesLayout";
import NavBar from "@/components/NavBar";
import { NotificationsProvider } from "@mantine/notifications";
import ProfilePictureLayout from "@/layouts/auth/ProfilePictureLayout";

export default function TableSelectionLayout() {
  return (
    <>
    <NotificationsProvider>
    <NavBar>
    </NavBar>
    <Container fluid className="bg-gradient-to-b from-rose-100 to-white">
      <Grid>
        <Grid.Col span={12} md={6}>
          <CreateJoinTableLayout />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <UserTablesLayout />
        </Grid.Col>
      </Grid>
    </Container>
    </NotificationsProvider>
    </>
  )
}