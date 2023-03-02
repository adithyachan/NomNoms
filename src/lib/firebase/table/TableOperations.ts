import { ITable, Table } from "@/types/Table";
import { collection, doc, QueryDocumentSnapshot } from "firebase/firestore";
import { ReadDocumentWithConverter, ReadCollectionWithConverter, WriteDocumentWithConverter, DeleteDocument } from "../FirestoreOperations";
import { useFirebaseFirestore } from "../hooks/useFirebase";

// Name of collection to use
const collectionName = "tables";
// Converter function to go from data to table object
const tableConverter = {
  toFirestore: (table: Table) => {
      return {
          name: table.name,
          lastAccessed: table.lastAccessed,
          users: table.users,
          leader: table.leader,
          prefs: table.prefs,
          expiration: table.expiration
        };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
      const data = (snapshot.data() as ITable);
      return new Table(data);
  }
};

/**
 * Reads table with the given id
 * @param docName The table id
 * @returns 
 */
export const ReadTable = async (docName: string) => {
  const firestore = useFirebaseFirestore()
  try {
    const docRef = doc(firestore, collectionName, docName)
    const data = await ReadDocumentWithConverter(docRef)
    const table = tableConverter.fromFirestore(data!)
    return table
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
export const ReadTables = async () => {
  const firestore = useFirebaseFirestore()
  try {
    const collectionRef = collection(firestore, collectionName)
    const tables: {[id: string]: Table} = {};
    (await ReadCollectionWithConverter(collectionRef))?.forEach(
      (table: QueryDocumentSnapshot) => {
        tables[table.id] = tableConverter.fromFirestore(table)
      }
    );

    return tables
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
    const table = await WriteDocumentWithConverter(docRef, data)
    return docRef.id
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