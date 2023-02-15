import { Table } from "@/types/Table";
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
          expiration: table.expiration
        };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
      const data = snapshot.data();
      console.log(data)
      return new Table(data.name, data.lastAccessed, data.users, data.leader, data.expiration);
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
    const docRef = doc(firestore, collectionName, docName).withConverter(tableConverter)
    const table = (await ReadDocumentWithConverter(docRef))?.data()
    return table
  }
  catch (e) {
    console.log("Error reading table: " + e)
    return undefined
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
    console.log("Error reading table: " + e)
    return undefined
  }
}

/**
 * Writes a Table object to the firestore
 * @param data Table object to write
 * @returns id of the object that was written
 */
export const WriteTable = async (data: Table) => {
  const firestore = useFirebaseFirestore()
  try {
    const docRef = doc(collection(firestore, collectionName)).withConverter(tableConverter);
    const table = (await WriteDocumentWithConverter(docRef, data))
  }
  catch (e) {
    console.log("Error reading table: " + e)
    return undefined
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
    console.log("Error deleting table: " + e)
  }
}