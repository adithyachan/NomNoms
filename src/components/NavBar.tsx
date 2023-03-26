import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Header,
  Burger,
  Image
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    marginBottom: 20,
  },
  mainSection: {
    paddingBottom: theme.spacing.sm,
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

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));


export default function NavBar({ user }: any) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const userActive = useFirebaseAuth().currentUser?.email;

  console.log("Email: " + userActive);

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div className="">
      <Container className={classes.mainSection}>
        <Group position="apart">

          <Image width={200} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center flex"/>

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            //transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user.image} alt={userActive!} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {userActive}
                  </Text>
                  <IconChevronDown size={20} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconHeart size="14" color={theme.colors.red[6]} stroke={1.5} />}
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                icon={<IconStar size="14" color={theme.colors.yellow[6]} stroke={1.5} />}
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                icon={<IconMessage size="14" color={theme.colors.blue[6]} stroke={1.5} />}
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size="14" stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size="14" stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size="14" stroke={1.5} />}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size="14" stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size="14" stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      </div>
    </Header>
  );
}
/*
import { useRouter } from "next/router";
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import { Header, Text, Menu, Button, Image } from "@mantine/core";

export default function NavBar (props: any) {
    const router = useRouter();
    const HandlePasswordChange = () => {
      router.push('auth/changePass')
    }
    const HandleDelete = () => {
      router.push('auth/deleteAccount')
    }

    return (
        <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Image width={200} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button className='bg-rose-500 hover:bg-rose-600 '> Menu</Button>
                </Menu.Target>

    
                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                  <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                  <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                  <Menu.Item
                    icon={<IconSearch size={14} />}
                    rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                    >
                    Search
                  </Menu.Item>
    
                  <Menu.Divider />
    
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item onClick={HandlePasswordChange} icon={<IconArrowsLeftRight size={14} />}>Change Password</Menu.Item>
                  <Menu.Item onClick={HandleDelete} color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              </div>
            </Header>
    );
}
*/
