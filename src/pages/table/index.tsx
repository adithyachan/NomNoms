/* TODO: Create Table Main Page */
import { WriteToCloudFirestore } from "../../lib/firebase/WriteToCloudFirestore";
import { ReadCollectionFromCloudFirestore } from "../../lib/firebase/ReadFromCloudFirestore";
import { QuerySnapshot, QueryDocumentSnapshot, DocumentData} from "firebase/firestore"
import Table from "../../types/Table";
import { useState } from "react";

export default function TablePage() {
  const [content, setContent] = useState<any>();
  const col = "tables"
  const data: Table = {
    generated: (new Date()).toISOString(),
    users: [],
    leader: ""
  }

  const sendData = async () => {
    await WriteToCloudFirestore(col, data)
  }

  const readData = async () => {
    const dataAccessed = await ReadCollectionFromCloudFirestore(col)
    setContent(dataAccessed?.docs)
  }

  return (
    <>
      <button onClick={ sendData }>create data</button>
      <button onClick={ readData }>read data</button>
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