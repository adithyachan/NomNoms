import TableCard from "@/components/table/tableSelection/TableCard";
import { Center, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ReadTables } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useUser } from "@/providers/AuthProvider";

export default function UserTablesLayout() {
  const { user } = useUser()
  const [tables, setTables] = useState<Table[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const unsub = ReadTables(setTables)
    setLoading(false)

    return unsub
  }, [])

  return(
    <>
      <Flex className="bg-white p-10 mt-10 rounded-3xl shadow-lg shadow-rose-100 flex-col justify-center">
        <Text className="mb-10 text-5xl text-center font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Tables</Text>
          { loading ?
           <LoadingLayout /> 
           : 
           <ScrollArea type="hover" className="h-60" scrollbarSize={0}>
            <Center>
              <Grid columns={24} className="m-1">
                {tables?.filter((table) => table.users.includes(user.uid!)).map(
                  (table) =>
                  <Grid.Col key={table.id} span={22} sm={12}>
                    <TableCard table={table} id={table.id} />
                  </Grid.Col>
                )}
              </Grid>
            </Center>
          </ScrollArea> }
      </Flex>
      
    </>
  );
}