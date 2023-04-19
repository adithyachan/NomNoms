import { ITable, Table } from "@/types/Table";
import { collection, doc, QueryDocumentSnapshot, onSnapshot, query, DocumentSnapshot } from "firebase/firestore";
import { WriteDocumentWithConverter, DeleteDocument } from "../FirestoreOperations";
import { useFirebaseFirestore } from "../hooks/useFirebase";

// Name of collection to use
const collectionName = "tables";
// Converter function to go from data to table object
const tableConverter = {
  toFirestore: (table: Table) => {
      return {
          id: table.id,
          name: table.name,
          lastAccessed: table.lastAccessed,
          users: table.users,
          banned: table.banned,
          leader: table.leader,
          prefs: table.prefs,
          expiration: table.expiration,
          numDoneVoting: table.numDoneVoting,
          description: table.description,
          date: table.date,
          prefsDone: table.prefsDone,
          restaurantList: table.restaurantList
        };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot | DocumentSnapshot) => {
    try {
      const data = (snapshot.data() as ITable);
      return new Table(data);
    }
    catch (err) {
      throw err
    }
      
  }
};

/**
 * Reads table with the given id
 * @param docName The table id
 * @returns 
 */
export const ReadTable = (docName: string, setDoc: any) => {
  const firestore = useFirebaseFirestore()
  try {
    const unsub = onSnapshot(doc(firestore, collectionName, docName), (doc) => {
      const converted = tableConverter.fromFirestore(doc)
      setDoc(converted)
      console.log(converted)
    });

    return unsub
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Reads all tables
 * @returns object containing all tables as type {[id: string] : Table}
 */
export const ReadTables =  (setDocs: any) => {
  const firestore = useFirebaseFirestore()
  try {
    const q = query(collection(firestore, collectionName));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const docs: Table[] = [];
      querySnapshot.forEach((doc) => {
          const converted = tableConverter.fromFirestore(doc)
          docs.push(converted);
      });
      setDocs(docs)
      console.log(docs);
    });

    return unsub
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Writes a Table object to the firestore
 * @param data Table object to write
 * @returns id of the object that was written
 */
export const WriteTable = async (data: ITable) => {
  const firestore = useFirebaseFirestore()
  try {
    const docRef = doc(collection(firestore, collectionName)).withConverter(tableConverter);
    data.id = docRef.id
    const table = await WriteDocumentWithConverter(docRef, data)
    return table
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Writes a Table object to the firestore
 * @param data Table object to write
 * @returns id of the object that was written
 */
export const UpdateTable = async (data: ITable) => {
  const firestore = useFirebaseFirestore()
  try {
    const docRef = doc(collection(firestore, collectionName), data.id).withConverter(tableConverter);
    const table = await WriteDocumentWithConverter(docRef, data)
    return table
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Delete table of the given id
 * @param docName id of the table to delete
 */
export const DeleteTable = async (docName: string) => {
  try {
    const table = (await DeleteDocument(collectionName, docName))
  }
  catch (e) {
    console.error("Error deleting table: " + e)
    throw e
  }
}