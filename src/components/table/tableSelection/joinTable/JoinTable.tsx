import { useEffect, useState } from 'react';
import { createStyles, Container, Center, Button, TextInput } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';
import { ReadTables } from '@/lib/firebase/table/TableOperations';
import { Table } from '@/types/Table';

import Link from 'next/link';

export default function JoinTable() {
  const [value, setValue] = useState("")
  const [ID, setID] = useState("")
  const [valid, setValid] = useState(false)

  const [tables, setTables] = useState<Table[]>()
  const [error, setError] = useState("")

  const checkValid = (id: string) => {
    let actual_id = id
    if (id.startsWith(process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/")) {
      actual_id = id.substring((process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/").length)
    }
    else if (id.startsWith("https://" + process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/")) {
      actual_id = id.substring(("https://" + process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/").length)
    }
    else if (id.startsWith("http://" + process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/")) {
      actual_id = id.substring(("http://" + process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/").length)
    }

    setValue(id)
    setID(actual_id)
    setError("")
    setValid(true)
    if (tables) {
      setValid(tables.map((table) => table.id).includes(actual_id))
    }
    else {
      setError("Invalid table link or code")
    }
  }

  useEffect(()=>{
    try {
      const unsub = ReadTables(setTables)
      return unsub
    }
    catch {
      setTables([])
    }
    
  }, [])

  return (
    <>
      <Container fluid className="mb-4">
        <TextInput
          placeholder="Paste a link or ID"
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
        <Link className="text-white no-underline" href={valid ? `/tables/${encodeURIComponent(ID)}` : ""}>
          <Button color="red" disabled={!valid}>
              Join
          </Button>
        </Link>
      </Center>
    </>
  )
}