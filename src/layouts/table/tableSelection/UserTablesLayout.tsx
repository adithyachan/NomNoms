import TableCard from "@/components/table/tableSelection/TableCard";
import { Center, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ReadTables } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useUser } from "@/providers/AuthProvider";
import { Card, Title, Group, Tooltip, Menu, ActionIcon, Button } from "@mantine/core";
import { CopyButton } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { IconSettings } from "@tabler/icons-react";

export default function UserTablesLayout() {
  const router = useRouter()

  const { user } = useUser()
  const [tables, setTables] = useState<Table[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const unsub = ReadTables(setTables)
    setLoading(false)

    return unsub
  }, [])

  const joinTable = () => {
    router.push("/tables")
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


  return(
    <>
      <Flex className="bg-white mb-5 p-10 mt-10 rounded-3xl shadow-lg shadow-rose-100 flex-col justify-center">
        <Text className="mb-10 text-5xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Tables</Text>
          { loading ?
           <LoadingLayout /> 
           : 
           <ScrollArea type="hover" className="h-60" scrollbarSize={0}>
                <Grid columns={24} className="m-1 w-full">
                  {tables?.filter((table) => Object.keys(table.users).includes(user.uid!)).map(
                    (table) =>
                    <Grid.Col key={table.id} span={12}>
                      <TableCard table={table} id={table.id} />
                    </Grid.Col>
                  )}
                </Grid>
          </ScrollArea> }
          <Text className="mb-8"></Text>
          <Text className="mb-3 text-5xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Individual </Text>
          <Text className=" text-3 mb-4 text-center font-light" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Feeling like solo exploring? Use your personal table below! </Text>
          
          <Center className="flex-col space-y-2">
          <div  style=
          {{ height: '100%', 
            width: '300px',
          }} > 

             <Card  style={{
                justifyContent: 'center' }} 
             className="shadow-lg bg-rose-100 shadow-rose-200 transition ease-in-out hover:shadow-xl delay-100 duration-500 hover:shadow-rose-300 rounded-lg">
              <Text className= "mb-3 text-5 font-black text-center " >Personal Table</Text>
          

        <Center className="flex-col space-y-2">
          <Group>
          
            <Button color="red" size="xs" compact  onClick={joinTable}>
               Let&apos;s Eat! 
            </Button>
          </Group>
        </Center>

      </Card>
      </div>
      </Center>

    

          

      </Flex>
      
    </>
  );
}




