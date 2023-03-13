/*
import { useState, useEffect } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Image,
  Header
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
} from '@tabler/icons';
import { UseAuth } from '@/lib/firebase/auth/AuthProvider';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: ` solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    marginBottom: 50,
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

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 200,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    },
  },
}));

export default function HeaderTabs({ user } : any) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  let currUser = UseAuth();

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', height: '100%'}}>
      <Container className={classes.mainSection}>
        <Group position="apart">

          <Image width={200} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>


          <Menu
            width={200}
            position="bottom-end"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar alt={currUser.email} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {}
                  </Text>
                  <IconChevronDown size={20} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                icon={<IconMessage size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
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

*/

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
