import TableCard from "@/components/table/tableSelection/TableCard";
import { Center, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ReadTables } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";
import LoadingLayout from "@/layouts/LoadingLayout";

export default function UserTablesLayout() {
  const [tables, setTables] = useState<{[id: string]: Table}>({})
  const [loading, setLoading] = useState(false)

  const getTables = async () => {
    setTables(await ReadTables())
  }

  useEffect(() => {
    setLoading(true)
    getTables()
    setLoading(false)
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
                {Object.keys(tables).map(
                  (id) =>
                  <Grid.Col key={id} span={22} sm={12}>
                    <TableCard table={tables[id]} id={id} />
                  </Grid.Col>
                )}
              </Grid>
            </Center>
          </ScrollArea> }
      </Flex>
      
    </>
  );
}