import { Table } from '@/types/Table';
import {
  Group,
  Avatar,
  Text,
  Flex,
  Menu,
  ActionIcon
} from '@mantine/core';

import { IconSettings, IconCrown, IconX } from '@tabler/icons-react';
import { UpdateTable } from '@/lib/firebase/table/TableOperations';


interface UserCardProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string;
  name: string;
  email: string;
  leaderView?: boolean;
  icon?: React.ReactNode;
  table: Table;
}

export default function UserCard({ image, name, email, leaderView, icon, table }: UserCardProps) {
  const transferLeadership = async () => {
    table.leader = name
    await UpdateTable(table)
  }

  const kickUser = async () => {
    table.users = table.users.filter(item => item !== name)
    await UpdateTable(table)
  }

  return (
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
            <Menu.Item color="red" onClick={transferLeadership} icon={<IconCrown className='h-3 w-3 fill-amber-500'/>}>
              Transfer Leadership
            </Menu.Item>
            <Menu.Item color="red" onClick={kickUser} icon={<IconX className='h-3 w-3'/>}>
              Kick Nomster
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
  );
}