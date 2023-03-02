import { useState } from "react"
import { Button, Center, TextInput, Tooltip, createStyles, Container } from "@mantine/core"
import { useInputState, useDisclosure } from '@mantine/hooks';

import { Table, ITable } from "@/types/Table"
import { WriteTable } from "@/lib/firebase/table/TableOperations"
import { Timestamp } from "firebase/firestore"
import CodeModal from "./CodeModal";

const special_chars = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/

export default function CreateTable() {
  const [value, setValue] = useInputState('');
  const [zip, setZip] = useInputState('');
  const [price, setPrice] = useInputState('');
  const [cuisine, setCuisine] = useInputState('');

  const [error, setError] = useState(null)
  const [openedName, inputHandlersName] = useDisclosure();
  const [openedZip, inputHandlersZip] = useDisclosure();
  const [openedPrice, inputHandlersPrice] = useDisclosure();

  // show code modal
  const [codeOpen, codeHandlers] = useDisclosure();
  const [code, setCode] = useState("");

  // Input validation
  const special_chars_check = !special_chars.test(value)
  const length_check = value.length >= 4 && value.length <= 16
  const zip_check = zip.length == 5 && !Number.isNaN(zip)
  const price_check = ["$", "$$", "$$$", "$$$$"].includes(price)
  const valid = special_chars_check && length_check && zip_check && price_check && cuisine;

  const handleTableCreation = async () => {
    const tableJSON: ITable = {
      name: value,
      lastAccessed: Timestamp.fromDate(new Date()),
      users: [],
      leader: "test",
      prefs: {
        zip: zip,
        price: price,
        cuisine: cuisine,
      },
      expiration: Timestamp.fromDate(new Date()),
    }
    const table = new Table(tableJSON)
    
    try {
      const code = await WriteTable(table)
      setValue('')
      setZip('')
      setPrice('')
      setCuisine('')
      setCode(code)
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
        <Tooltip
        label={price_check ? null : "Try $, $$, $$$, $$$$"}
        position="left"
        withArrow
        opened={openedPrice && !price_check}
        color={"red.8"}
        >
          <TextInput
            placeholder="Price ($, $$, $$$, $$$$)"
            mt="md"
            onFocus={() => inputHandlersPrice.open()}
            onBlur={() => inputHandlersPrice.close()}
            value={price}
            onChange={setPrice}
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