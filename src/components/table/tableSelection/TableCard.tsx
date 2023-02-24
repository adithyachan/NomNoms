import { Table } from "@/types/Table";
import { Card, Text, CopyButton, Tooltip, ActionIcon, Button, Group, Center } from "@mantine/core"
import { IconCheck, IconCopy, IconSettings } from "@tabler/icons";
import { useRouter } from "next/router";



export default function TableCard(props: {table: Table, id: string}) {
  const router = useRouter()

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

  const joinTable = () => {
    router.push("/tables/" + props.id)
  }

  return (
    <>
      <Card className="shadow-lg bg-rose-100 shadow-rose-200 transition ease-in-out hover:shadow-xl delay-100 duration-500 hover:shadow-rose-300 rounded-lg">
        <Center className="flex-col space-y-2">
          <Text weight={500}>{ props.table.name }</Text>
          <Group>
            <Tooltip label="Settings" withArrow position="bottom">
              <ActionIcon>
                <IconSettings size={12} />
              </ActionIcon> 
            </Tooltip>
            <Button color="red" size="xs" compact  onClick={joinTable}>
              Join
            </Button>
            { copy(process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/" + props.id) }
          </Group>
        </Center>
      </Card>
    </>
  );
}