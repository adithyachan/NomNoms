import TableCard from "@/components/table/tableSelection/TableCard";
import { Container, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { ReadTables } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";

export default function UserTablesLayout() {
  const [tables, setTables] = useState<{[id: string]: Table}>({})

  const getTables = async () => {
    setTables(await ReadTables())
  }

  useEffect(() => {
    getTables()
  }, [])

  return(
    <>
      <Container className="bg-white p-10 mt-10 rounded-3xl shadow-lg shadow-rose-100">
        <Text className="mb-10 text-center text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Your Tables</Text>
        <Grid>
          {Object.keys(tables).map(
            (id) =>
            <Grid.Col key={id} span={12} sm={6}>
              <TableCard table={tables[id]} id={id} />
            </Grid.Col>
          )}
        </Grid>
      </Container>
      
    </>
  );
}