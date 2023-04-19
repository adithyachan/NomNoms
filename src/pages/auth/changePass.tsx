import NavBar from "@/components/NavBar";
import ChangePasswordLayout from "@/layouts/auth/ChangePasswordLayout"
import { Container, Grid } from "@mantine/core";


export default function ChangePassword() {
return(
    <>
    <NavBar>
      
    </NavBar>
    <Container fluid className="bg-gradient-to-b from-rose-100 to-white">

    <Grid>
        <Grid.Col span={12} md={12}>
          <ChangePasswordLayout />
        </Grid.Col>
    </Grid>   
    </Container>
    </> 
);
}