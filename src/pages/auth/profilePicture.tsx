import NavBar from "@/components/NavBar";
import ProfilePictureLayout from "@/layouts/auth/ProfilePictureLayout";
import { Container, Grid } from "@mantine/core";

export default function ChangeProfilePicture() {
    return (
        <>
        <NavBar>
        </NavBar>
    <Container fluid className="bg-gradient-to-b from-rose-100 to-white">
    <Grid>
        <Grid.Col span={12} md={6}>
          <ProfilePictureLayout />
        </Grid.Col>
    </Grid>   
    </Container>
    </> 
    );
}
