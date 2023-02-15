/* TODO: Create Table Main Page */
import { WriteToCloudFirestore } from "@/lib/firebase/WriteToCloudFirestore";
import { ReadCollectionFromCloudFirestore } from "@/lib/firebase/ReadFromCloudFirestore";
import { DeleteDocumentFromCloudFirestore } from "@/lib/firebase/DeleteFromCloudFirestore";
import { QuerySnapshot, QueryDocumentSnapshot, DocumentData} from "firebase/firestore"
import Table from "../../types/Table";
import { useState } from "react";

export default function TablePage() {
  const [content, setContent] = useState<any>();
  const [doc, setDoc] = useState("");

  const col = "tables";

  const data: Table = {
    generated: (new Date()).toISOString(),
    users: [],
    leader: ""
  }

  const writeData = async () => {
    await WriteToCloudFirestore(col, data)
  }

  const readData = async () => {
    const dataAccessed = await ReadCollectionFromCloudFirestore(col)
    setContent(dataAccessed?.docs)
  }

  const deleteData = async () => {
    await DeleteDocumentFromCloudFirestore(col, doc)
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
      { content?.map( 
        (doc: any) => {
          return (
            <li key={doc.id}>{doc.id + "=>" + (doc.data() as Table).generated}</li>
          )
        })
      }
      </ul>
    </>
  );
}