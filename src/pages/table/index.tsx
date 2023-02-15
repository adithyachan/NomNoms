/* TODO: Create Table Main Page */
import { ReadTable, ReadTables, WriteTable, DeleteTable } from "@/lib/firebase/table/TableOperations";
import { Timestamp } from "firebase/firestore";

import { Table } from "../../types/Table";
import { useState } from "react";

export default function TablePage() {
  const [content, setContent] = useState<{[id: string]: Table}>();
  const [doc, setDoc] = useState("");

  const col = "tables";

  const data: Table = {
    name: "",
    lastAccessed: Timestamp.fromDate(new Date()),
    users: [],
    leader: "",
    expiration: Timestamp.fromDate(new Date((new Date()).getTime() + 60 * 60 * 24 * 1000)),
  }

  const writeData = async () => {
    await WriteTable(data)
  }

  const readData = async () => {
    const dataAccessed = await ReadTables()
    setContent(dataAccessed)
  }

  const deleteData = async () => {
    await DeleteTable(doc)
    await readData()
    setDoc("")
  }

  return (
    <>
      <button onClick={ writeData }>create data</button>
      <button onClick={ readData }>read data</button>
      <button onClick={ deleteData }>delete {doc}</button>
      <input onChange={ (e) => {setDoc(e.currentTarget.value)} } value={doc}></input>
      <ul>
      { content ? Object.keys(content).map( 
        (key) => {
          return (
            <li key={key}>{key + ": " + content[key].lastAccessed.toDate() + "=>" + content[key].expiration.toDate()}</li>
          )
        }) : null
      }
      </ul>
    </>
  );
}