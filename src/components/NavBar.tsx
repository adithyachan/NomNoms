import { useRouter } from "next/router";
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import { Header, Text, Menu, Button } from "@mantine/core";

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
            <div style={{ display: 'flex', alignItems: 'center', height: '100%'}}>
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