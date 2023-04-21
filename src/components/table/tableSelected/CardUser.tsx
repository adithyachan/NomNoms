import { Table } from '@/types/Table';
import {
  Group,
  Avatar,
  Text,
  Flex,
  Menu,
  ActionIcon,
  Modal,
  Title,
  Button,
} from '@mantine/core';

import { IconSettings, IconCrown, IconX } from '@tabler/icons-react';
import { UpdateTable } from '@/lib/firebase/table/TableOperations';
import { useDisclosure } from '@mantine/hooks';

interface UserCardProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string|undefined|null;
  name: string;
  email: string;
  uid: string;
  leaderView?: boolean;
  icon?: React.ReactNode;
  table: Table;
}

export default function UserCard({ image, name, email, uid, leaderView, icon, table }: UserCardProps) {
  const [opened, { open, close }] = useDisclosure()
  const transferLeadership = async () => {
    table.leader = uid
    await UpdateTable(table)
  }

  const kickUser = async () => {
    table.banned.push(uid)
    delete table.users[uid]
    await UpdateTable(table)
  }

  const LeaveModal = () => (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered>
      <Title className="text-center" order={1}>Are you sure you want to ban <span className="text-red-500">{ name }</span>?</Title>
      <Flex className="space-x-5 mt-5 w-full justify-center">
        <Button color="red" onClick={kickUser}>
          Ban
        </Button>
        <Button color="gray" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )

  return (
    <>
      <LeaveModal />
      <Group className='bg-rose-100 p-5 shadow-rose-200 rounded-3xl shadow-lg transition-all ease-in-out hover:shadow-xl hover:shadow-red-300 delay-100 duration-500'>
        <Flex className="justify-between items-center w-full">
          <Avatar src={image} radius="xl" />
          { icon ? icon :
          leaderView ? 
          <Menu>
            <Menu.Target>
              <ActionIcon component="button" color="gray" variant='subtle'>
                <IconSettings className='h-5 w-5'/>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Manage Nomster</Menu.Label>
              <Menu.Item onClick={transferLeadership} icon={<IconCrown className='h-3 w-3 fill-amber-500'/>}>
                Transfer Leadership
              </Menu.Item>
              <Menu.Item color="red" onClick={open} icon={<IconX className='h-3 w-3'/>}>
                Ban Nomster
              </Menu.Item>
            </Menu.Dropdown>
          </Menu> :
          null }
        </Flex>
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </>
  );
}