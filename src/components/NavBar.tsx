import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Header,
  Image,
  Button, 
} from '@mantine/core';
import { showNotification } from "@mantine/notifications";
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconCheck,
  IconX,
  IconDoorExit
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
import { useUser } from '@/providers/AuthProvider';
import { useRouter } from "next/router";
import { deleteUser, signOut } from "firebase/auth";
import { User } from "@/types/User";
import { ReadUsers } from "@/lib/firebase/auth/AuthOperations";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },


  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));


export default function NavBar(props : any) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [users, setUsers] =  useState<User[]>();
  const { user } = useUser();
  const auth = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    const unsub = ReadUsers(setUsers)
    return unsub
  }, [])

  const userName = users?.find((item) => item.uid == user.uid)?.username!


  const HandleChange = () => {
    router.push('auth/changePass')
  }
 
  const HandleSignOut = async (e : any) => {
    e.preventDefault();
    console.log("checking google")
    signOut(auth).then(() => {
    // Sign-out successful
    console.log("user was successfully signed out");
    showNotification({
      title: 'Success!',
      message: 'Signed out of account successfully!',
      autoClose: 3000,
      color: 'green',
      icon: <IconCheck size={16} />,
      styles: () => ({
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
        closeButton: {
          color: '#F43F5E',
          '&:hover': { backgroundColor: '#F43F5E' },
        },
      }),            
    })
  });  
  }

  const HandleDelete = async (e : any) => {
    router.push('/auth/deleteAccount')
  }

  return (
    <Header height={50} sx={{ borderBottom: 0 }} mb={10}>
      <Container className={`${classes.inner}`}  fluid>
          <Image 
            width={200} 
            src="/images/full_logo.png" 
            alt="Main NomNoms Logo" 
            className="w-fit"
            />
            <Group className='space-x-3'>
              {/[a-zA-Z0-9]{20}/g.test(router.asPath) || router.asPath.includes("individual-table") ? <Button leftIcon={<IconDoorExit />} color='red' onClick={() => router.push("/tables")}>
                Back to home
              </Button> : null}
              <Menu
              width={300}
              position="bottom-end"
              //transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              closeOnItemClick={true}
              closeOnClickOutside={true}
              withinPortal

              
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group spacing={7}>
                      <Avatar alt={user.email!} radius="xl" size={20} />
                      <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                        {userName!}
                      </Text>
                      <IconChevronDown size={20} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item 
                  icon={<IconSwitchHorizontal size="14" 
                  stroke={1.5} 
                  />}
                  onClick={HandleChange}
                  >
                    Change Password
                  </Menu.Item>
                  <Menu.Item 
                  icon={<IconLogout size="14" stroke={1.5} />}
                  onClick={HandleSignOut}
                  >Logout</Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item 
                  color="red" 
                  icon={<IconTrash size="14" stroke={1.5} />}
                  onClick={HandleDelete}
                  >
                    Delete account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            
      </Container>
    </Header>
  );
}
