import { useState } from "react"
import { Button, Center, TextInput, Tooltip, Container } from "@mantine/core"
import { useInputState, useDisclosure } from '@mantine/hooks';

import { Table, ITable } from "@/types/Table"
import { WriteTable } from "@/lib/firebase/table/TableOperations"
import { Timestamp } from "firebase/firestore"
import CodeModal from "./CodeModal";
import { useUser } from "@/providers/AuthProvider";
import { DatePicker } from "@mantine/dates";
import firebase from "firebase/compat";


const special_chars = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/

export default function CreateTable() {
  const { user } = useUser()
  const [value, setValue] = useInputState('');
  const [zip, setZip] = useInputState('');
  const [date, setDate] = useInputState(new Date().toISOString());
  const [desc, setDesc] = useInputState('');

  const [error, setError] = useState(null)
  const [openedName, inputHandlersName] = useDisclosure();
  const [openedZip, inputHandlersZip] = useDisclosure();
  const [openedDesc, inputHandlersDesc] = useDisclosure();
  const [openedDate, inputHandlersDate] = useDisclosure();

  // show code modal
  const [codeOpen, codeHandlers] = useDisclosure();
  const [code, setCode] = useState("");

  // Input validation
  const special_chars_check = !special_chars.test(value)
  const length_check = value.length >= 4 && value.length <= 16
  const zip_check = zip.length == 5 && !Number.isNaN(zip)
  const valid = special_chars_check && length_check && zip_check

  

  const handleTableCreation = async () => {
    console.log(value)
    console.log(desc)
    console.log(date)
    const tableJSON: ITable = {
      id: "",
      name: value,
      description: desc,
      date: Timestamp.fromDate(new Date(date)),
      lastAccessed: Timestamp.fromDate(new Date()),
      // users: [user.uid!],
      users: {},
      leader: user.uid!,
      prefs: {
        zip: zip,
      },
      expiration: Timestamp.fromDate(new Date((new Date()).getTime() + 60 * 60 * 24 * 1000)),
    }
    console.log(tableJSON)
    tableJSON.users[user.uid!] = {}
    const table = new Table(tableJSON)
    
    try {
      //console.log(table)
      const code = await WriteTable(table)
      setValue('')
      setZip('')
      setDesc('')
      setDate('')
      setCode(code!)
      codeHandlers.open()
    }
    catch (e: any) {
      setError(e)
    }
  }

  return (
    <>
      {codeOpen ? <CodeModal code={ code } open={ codeOpen } handler={ codeHandlers }/> : null} 
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
            placeholder="Table Description"
            onFocus={() => inputHandlersDesc.open()}
            onBlur={() => inputHandlersDesc.close()}
            mt="md"
            value={desc}
            onChange={setDesc}
          />
          
         
<DatePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      onFocus={() => inputHandlersDate.open()}
      onBlur={() => inputHandlersDate.close()}
      value={date ? new Date(date) : null}
      onChange={(date) => setDate(date?.toISOString())}
      maw={400}
      mx="auto"
    />
      </Container>
      <Center>
        <Button color="red" disabled={!valid} onClick={handleTableCreation}>Create</Button>
      </Center>
    </>
  )
}