import {
  Group,
  Avatar,
  Text,
  UnstyledButton,
  Menu
} from '@mantine/core';

import { forwardRef } from "react"


interface UserCardProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const UserButton = forwardRef<HTMLButtonElement, UserCardProps>(
  ({ image, name, email, icon, ...others }: UserCardProps, ref) => (
    <UnstyledButton ref={ref}>
      <Group className='bg-rose-100 p-5 shadow-rose-200 rounded-3xl shadow-lg transition-all ease-in-out hover:shadow-xl hover:shadow-red-300 delay-100 duration-500'>
        <Avatar src={image} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
        { icon }
      </Group>
    </UnstyledButton>
  )
);

export default function UserCard({ image, name, email, icon }: UserCardProps) {

  return (
    <Group position="center">
      <Menu>
        <Menu.Target>
          <UserButton
            image={image}
            name={name}
            email={email}
            icon={icon}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component="a"
            href="https://mantine.dev"
            target="_blank"
          >
            External link
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}