import { Container, Grid } from "@mantine/core";
import CreateJoinTableLayout from "./CreateJoinTableLayout";
import UserTablesLayout from "./UserTablesLayout";
import { showNotification } from "@mantine/notifications";
import { Button} from "@mantine/core";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { signOut } from "firebase/auth";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function TableSelectionLayout() {
  return (
    <Container fluid className="bg-gradient-to-b from-rose-100 to-white">
      <Grid>
        <Grid.Col span={12} md={6}>
          <CreateJoinTableLayout />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <UserTablesLayout />
        </Grid.Col>
      </Grid>

      <Button className={`bg-rose-500 hover:bg-rose-600 `} onClick = {HandleSignOut} type="submit">Sign Out</Button>

    </Container>
  )
}

const HandleSignOut = async (e: any) => {
  console.log("checking google")
  const auth = useFirebaseAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
  console.log("user was successfully signed out")
  showNotification({
    title: 'Success!',
    message: 'Signed out of account successfully!',
    autoClose: 3000,
    color: 'red',
    icon: <IconCheck size={16} />,
    
    styles: () => ({
      /*
      root: {
        backgroundColor: '#FFE4E6',
        borderColor: '#FFE4E6',
        '&::before': { backgroundColor: '#FFFFFF' },
      },
      */
      //title: { color: '#F43F5E' },
      //description: { color: '#F43F5E'},
      closeButton: {
        color: '#F43F5E',
        '&:hover': { backgroundColor: '#F43F5E' },
      },
    }),            
  })
}).catch((error) => {
  // An error happened.
  console.log("error occurred, user was not signed out successfully")
  showNotification({
    title: 'Error occurred!',
    message: 'Unable to sign out of account!',
    autoClose: 3000,
    color: 'red',
    icon: <IconX size={16} />,
    
    styles: () => ({
      /*
      root: {
        backgroundColor: '#FFE4E6',
        borderColor: '#FFE4E6',
        '&::before': { backgroundColor: '#FFFFFF' },
      },
      */
      //title: { color: '#F43F5E' },
      //description: { color: '#F43F5E'},
      closeButton: {
        color: '#F43F5E',
        '&:hover': { backgroundColor: '#F43F5E' },
      },
    }),            
  })
});  
// (<Button onClick= {HandleSignOut} leftIcon={<GoogleIcon />} variant="default" color="gray" />);
}