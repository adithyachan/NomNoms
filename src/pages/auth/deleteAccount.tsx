import NavBar from "@/components/NavBar";
import DeleteAccountLayout from "@/layouts/auth/DeleteAccountLayout";
import { Container, Grid } from "@mantine/core";
export default function DeleteAccount() {
    return(
        <>
        <NavBar >
        </NavBar>
    <Container fluid className="bg-gradient-to-b from-rose-100 to-white">
    
    <Grid>
        <Grid.Col span={12} md={4.5}></Grid.Col>
          < DeleteAccountLayout />
        </Grid>
        </Container>
       
        </>
        );
    }
