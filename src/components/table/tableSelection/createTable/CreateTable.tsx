import { useState } from "react"
import { Button, Center, TextInput, Tooltip, createStyles, Container } from "@mantine/core"
import { useInputState, useDisclosure } from '@mantine/hooks';

import { Table, ITable } from "@/types/Table"
import { WriteTable } from "@/lib/firebase/table/TableOperations"
import { Timestamp } from "firebase/firestore"

const special_chars = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/

export default function CreateTable() {
  const [value, setValue] = useInputState('');
  const [error, setError] = useState(null)
  const [opened, handlers] = useDisclosure();

  // Input validation
  const special_chars_check = !special_chars.test(value)
  const length_check = value.length >= 4 && value.length <= 16
  const valid = special_chars_check && length_check;

  const handleTableCreation = async () => {
    const tableJSON: ITable = {
      name: value,
      lastAccessed: Timestamp.fromDate(new Date()),
      users: [],
      leader: "test",
      expiration: Timestamp.fromDate(new Date()),
    }
    const table = new Table(tableJSON)
    
    try {
      await WriteTable(table)
      setValue('')
    }
    catch (e: any) {
      setError(e)
    }
  }

  return (
    <>
      <Container fluid className="pb-4">
        <Tooltip
        label={length_check ? special_chars_check ? null : "No special characters" : "Name must be 4-16 characters"}
        position="left"
        withArrow
        opened={opened && !valid}
        color={"red.8"}
        >
          <TextInput
            placeholder="Table Name"
            onFocus={() => handlers.open()}
            onBlur={() => handlers.close()}
            mt="md"
            value={value}
            onChange={setValue}
          />
        </Tooltip>
        {error ? <small className="text-red-500">error</small> : null}
      </Container>
      <Center>
        <Button color="red" disabled={!valid} onClick={handleTableCreation}>Create</Button>
      </Center>
    </>
  )
}