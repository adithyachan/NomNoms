import { Table } from "@/types/Table";
import { Card, Title, CopyButton, Tooltip, ActionIcon, Button, Group, Center, Menu, Modal, Flex, Text } from "@mantine/core"
import { IconCheck, IconCopy, IconSettings, IconDoorExit } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@/providers/AuthProvider";
import { UpdateTable } from "@/lib/firebase/table/TableOperations";
import { useEffect, useState } from "react";
import { ReadUsers } from "@/lib/firebase/auth/AuthOperations";
import { User } from "@/types/User";

export default function TableCard(props: {table: Table, id: string}) {
  const router = useRouter()
  const [opened, {open, close}] = useDisclosure()
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>();

  const removeTable = async () => {
    props.table.users = props.table.users.filter(item => item !== user.uid)
    await UpdateTable(props.table)
    close()
  }

  const copy = (link: string) => (
    <CopyButton value={ link } timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
          <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )

  const LeaveModal = () => (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered>
      <Title className="text-center" order={1}>Are you sure you want to leave <span className="text-red-500">{ props.table.name }</span>?</Title>
      <Flex className="space-x-5 mt-5 w-full justify-center">
        <Button color="red" onClick={removeTable}>
          Leave
        </Button>
        <Button color="gray" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )

  const joinTable = () => {
    router.push("/tables/" + props.id)
  }

  useEffect(() => {
    const unsub = ReadUsers(setUsers)
    return unsub
  }, [])

  return (
    <>
      <LeaveModal />
      <Card className="shadow-lg bg-rose-100 shadow-rose-200 transition ease-in-out hover:shadow-xl delay-100 duration-500 hover:shadow-rose-300 rounded-lg">
        <Center className="flex-col space-y-2">
          <Title order={5}>{ props.table.name }</Title>
          <Group>
            <Tooltip label="Settings" withArrow position="bottom">
              <Menu position="bottom">
                <Menu.Target>
                  <ActionIcon>
                    <IconSettings size={12} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Table Settings</Menu.Label>
                  <Menu.Item color="red" icon={<IconDoorExit className="h-3 w-3"/>} onClick={open}>
                    Leave Table
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              
            </Tooltip>
            <Button color="red" size="xs" compact  onClick={joinTable}>
              Join
            </Button>
            { copy(process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/" + props.id) }
          </Group>
          <small>Leader: { users?.find((item) => item.uid == props.table.leader)?.username }</small>
        </Center>
      </Card>
    </>
  );
}