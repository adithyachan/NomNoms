import { useEffect, useState } from 'react';
import { createStyles, Container, Center, Button, TextInput } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';
import { ReadTables } from '@/lib/firebase/table/TableOperations';
import { Table } from '@/types/Table';

import Link from 'next/link';

export default function JoinTable() {
  const [value, setValue] = useState('')
  const [opened, handlers] = useDisclosure()
  const [valid, setValid] = useState(false)

  const [tables, setTables] = useState<{[id: string]: Table}>()
  const [error, setError] = useState("")

  const getTables = async () => {
    try {
      const tables = await ReadTables()
      setTables(tables)
    }
    catch (e: any) {
      setTables({})
    }
  }

  const checkValid = (id: string) => {
    setValue(id)
    setError("")
    setValid(true)
    if (tables) {
      setValid(Object.keys(tables).includes(id))
    }
    else {
      setError("Could not locate table")
    }
  }

  useEffect(()=>{
    getTables()
  }, [])

  return (
    <>
      <Container fluid className="pb-4">
        <TextInput
          placeholder="ID"
          onFocus={() => handlers.open()}
          onBlur={() => handlers.close()}
          mt="md"
          value={value}
          onChange={(e) => {
            checkValid(e.currentTarget.value)
          }}
        />
        {error ? <small className="text-red-500">{ error }</small> : null}
        {!valid && value != "" ? <small className="text-red-500">{ "Could not find the specified table" }</small> : null}
      </Container>
      <Center>
        <Button color="red" disabled={!valid}>
          <Link className="text-white no-underline" href={`/tables/${encodeURIComponent(value)}`}>
            Join
          </Link>
        </Button>
      </Center>
    </>
  )
}