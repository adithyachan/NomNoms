import { useState } from "react"
import { Button, Center, TextInput, Tooltip, Container } from "@mantine/core"
import { useInputState, useDisclosure } from '@mantine/hooks';

import { Table, ITable } from "@/types/Table"
import { WriteTable } from "@/lib/firebase/table/TableOperations"
import { Timestamp } from "firebase/firestore"
import CodeModal from "./CodeModal";
import { useUser } from "@/providers/AuthProvider";

const special_chars = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/

export default function CreateTable() {
  const { user } = useUser()
  const [value, setValue] = useInputState('');
  const [zip, setZip] = useInputState('');
  const [cuisine, setCuisine] = useInputState('');

  const [error, setError] = useState(null)
  const [openedName, inputHandlersName] = useDisclosure();
  const [openedZip, inputHandlersZip] = useDisclosure();

  // show code modal
  const [codeOpen, codeHandlers] = useDisclosure();
  const [code, setCode] = useState("");

  // Input validation
  const special_chars_check = !special_chars.test(value)
  const length_check = value.length >= 4 && value.length <= 16
  const zip_check = zip.length == 5 && !Number.isNaN(zip)
  const valid = special_chars_check && length_check && zip_check && cuisine;

  const handleTableCreation = async () => {
    const tableJSON: ITable = {
      id: "",
      name: value,
      banned: [],
      lastAccessed: Timestamp.fromDate(new Date()),
      // users: [user.uid!],
      users: {},
      leader: user.uid!,
      prefs: {
        zip: zip,
        cuisine: "food",
        price: ""
      },
      expiration: Timestamp.fromDate(new Date((new Date()).getTime() + 60 * 60 * 24 * 1000)),
      numDoneVoting: 0,
      date: new Date(),
      description: "",
      prefsDone: [],
    }
    tableJSON.users[user.uid!] = {}
    const table = new Table(tableJSON)
    
    try {
      const code = await WriteTable(table)
      setValue('')
      setZip('')
      setCuisine('')
      setCode(code!)
      codeHandlers.open()
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
        opened={openedName && !(length_check && special_chars_check)}
        color={"red.8"}
        >
          <TextInput
            placeholder="Table Name"
            onFocus={() => inputHandlersName.open()}
            onBlur={() => inputHandlersName.close()}
            mt="md"
            value={value}
            onChange={setValue}
          />
        </Tooltip>
        {error ? <small className="text-red-500">error</small> : null}
        <Tooltip
        label={zip_check ? null : "Invalid Zip Code"}
        position="left"
        withArrow
        opened={openedZip && !zip_check}
        color={"red.8"}
        >
          <TextInput
            placeholder="Zip Code"
            onFocus={() => inputHandlersZip.open()}
            onBlur={() => inputHandlersZip.close()}
            mt="md"
            value={zip}
            onChange={setZip}
          />
        </Tooltip>
        <TextInput
          placeholder="Cuisine"
          mt="md"
          value={cuisine}
          onChange={setCuisine}
        />
      </Container>
      <Center>
        <Button color="red" disabled={!valid} onClick={handleTableCreation}>Create</Button>
      </Center>
    </>
  )
}