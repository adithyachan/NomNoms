/* TODO: Layout for Reset Password Page */
import {
    createStyles,
    Paper,
    Title,
    Text,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    Image,
    HoverCard,
  } from '@mantine/core';
  import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useRouter } from "next/router";
import React from 'react';
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';


  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
    invalid: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
    },
    icon: {
      color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
    },
  }));

  export default function DeleteAccountLayout() {
    const router = useRouter();

    const HandleDelete = async (e : any) => {
      e.preventDefault();
      const auth = useFirebaseAuth();
      const user = auth.currentUser;
      user?.delete().then(() => {
            showNotification({
              title: 'Account Successfully Deleted',
              message: 'Redirecting to Nomnoms HomePage.',
              autoClose: 3000,
              color: 'teal',
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
            setTimeout(() => {
                router.push('/tables');
            }, 2000)
      }).catch((error) => {
        console.log(error); 
        showNotification({
          title: 'Error!',
          message: 'An error occured while deleting your account.',
          autoClose: 3000,
          color: 'red',
          icon: <IconX size={16} />,
          styles: () => ({
            closeButton: {
              color: '#F43F5E',
              '&:hover': { backgroundColor: '#F43F5E' },
            },
          }),            
        })
      })
    };

      

    const HandleReturn = (e : any) => {
      router.push('/tables')
    }

    const { classes } = useStyles();

    return (
      <form onSubmit={HandleDelete}>
        <NotificationsProvider>
        <Container size={460} my={30} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Center className="flex-col">
            <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
            <Title className={classes.title} align="center">
                Delete Your Account
            </Title>
            <Text color="dimmed" size="sm" align="center">
              We are sorry to hear you&aposre considering deleting your NomNoms account
            </Text>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className='bg-rose-200'>

              <Group position="apart"  className={classes.controls}>
                <Anchor color="red" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft color='#F43F5E' size={12} stroke={1.5} />
                    <Box onClick={HandleReturn} ml={5}>
                      <Text color='#F43F5E'>
                        Back to dashboard
                      </Text>
                    </Box>
                  </Center>
                </Anchor>

                <HoverCard width={280} shadow="md">
                <HoverCard.Target >
                    <Button 
                    className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
                    type="submit"
                    >Delete Account
                    </Button>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                <Text size="sm">
                    Are you sure you want to delete your account? All data related to you will be deleted and will no longer show up in any tables.
                </Text>
                </HoverCard.Dropdown>
                </HoverCard>

              </Group>
            </Paper>
          </Center>
        </Container>     
      </NotificationsProvider>
      </form>
    );
  }
