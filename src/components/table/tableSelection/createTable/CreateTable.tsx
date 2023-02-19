import { useState } from "react"
import TableNameInput from "./TableNameInput"
import { Button, Center } from "@mantine/core"

import { Table, ITable } from "@/types/Table"
import { WriteTable } from "@/lib/firebase/table/TableOperations"

export default function CreateTable() {
  const [validName, updateValidName] = useState({ valid: false, name: "" })

  const handleTableCreation = () => {
    // const tableJSON: ITable = {
    //   name: validName.name,
    //   lastAccessed: Timestamp.from
    // }
    // const table = new Table()
  }

  return (
    <>
      <TableNameInput updateValidName={updateValidName} />
      <Center>
        <Button color="red" disabled={!validName.valid} onClick={handleTableCreation}>Create</Button>
      </Center>
    </>
  )
}