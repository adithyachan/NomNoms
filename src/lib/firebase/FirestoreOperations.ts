import {
        collection, 
        doc, 
        getDocs, 
        getDoc, 
        deleteDoc,
        addDoc,
        setDoc, 
        DocumentReference,
        CollectionReference} from "firebase/firestore";
  
import { useFirebaseFirestore } from "./hooks/useFirebase";
import { Table } from '@/types/Table'
import { User } from '@/types/User'


/**
 * Reads the document from the collection specified from firestore
 * @param collectionName name of the collection to read
 * @param docName name of the document in the collection to read 
 * @returns Promise of type QueryDocumentSnapshot. Use .data() to extract the actual payload
 */
export const ReadDocument = async (collectionName: string, docName: string) => {
  const firestore = useFirebaseFirestore()
  // Get document with name
  const query = await getDoc(doc(firestore, collectionName, docName))

  // Check if document exists
  if (query.exists()) {
    console.log("Document: " + query)
    return query
  }

  // document does not exist
  console.error("Document, " + docName + ", in collection, " + collectionName + ", does not exist!")
  return undefined
}

/**
 * Reads the document from the collection specified from firestore
 * @param collectionName name of the collection to read
 * @param docRef document reference with converter in the collection to read 
 * @returns Promise of type QueryDocumentSnapshot. Use .data() to extract the actual payload
 */
export const ReadDocumentWithConverter = async (docRef: DocumentReference) => {
  const firestore = useFirebaseFirestore()
  // Get document with name
  const query = await getDoc(docRef)

  // Check if document exists
  if (query.exists()) {
    console.log("Document: " + query)
    return query
  }

  // document does not exist
  console.error("Document, " + docRef.id + ", does not exist!")
  return undefined
}

/**
 * Reads an entire collection from firestore
 * @param collectionName name of the collection to read
 * @return Promise of type QuerySnapshot<DocumentData>. Use .docs to get all documents in the collection
 */
export const ReadCollection = async (collectionName: string) => {
  const firestore = useFirebaseFirestore()

  try {
    const query = await getDocs(collection(firestore, collectionName))
    return query
  }
  catch (e) {
    console.error("Collection, " + collectionName + ", does not exist.")
    return undefined
  }
}

/**
 * Reads an entire collection from firestore
 * @param collectionName name of the collection to read
 * @return Promise of type QuerySnapshot<DocumentData>. Use .docs to get all documents in the collection
 */
export const ReadCollectionWithConverter = async (collectionRef: CollectionReference) => {
  const firestore = useFirebaseFirestore()

  try {
    const query = await getDocs(collectionRef);
    return query
  }
  catch (e) {
    console.error("Collection, " + collectionRef.id + ", does not exist.")
    return undefined
  }
}

/** 
 * writeToCloudFirestore(col: string, doc: string, data: any)
 * Handles writing data to cloud firestore
 * 
 * @param {string} col Collection name to write to
 * @param {*} data Data to write
 * @param {string} doc (optional) Document id to write to. If ommitted, assigns a random unique document id that is
 * returned to user
 * 
 * @returns document id of written document
 */
export const WriteDocument = async (collectionName: string, data: Table | User , docName? : string | undefined) => {
    const firestore = useFirebaseFirestore()

    console.log(firestore)
    console.log(collectionName)
    console.log(data)

    try {
        if (docName) {
            await setDoc(doc(firestore, collectionName, docName!), data);
            console.log("Document written with ID: ", docName);
            return docName
        }
        else {
            const docRef = await addDoc(collection(firestore, collectionName), data);
            console.log("Document written with ID: ", docRef.id);
            return docRef.id
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

/** 
 * WriteDocumentWithConverter(col: string, doc: string, data: any)
 * Handles writing data to cloud firestore
 * 
 * @param {string} col Collection name to write to
 * @param {*} data Data to write
 * @param {string} doc (optional) Document id to write to. If ommitted, assigns a random unique document id that is
 * returned to user
 * 
 * @returns document id of written document
 */
export const WriteDocumentWithConverter = async (docRef: DocumentReference, data: Table | User) => {
  const firestore = useFirebaseFirestore()

  try {
      
      await setDoc(docRef, data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

/**
 * Deletes document from firestore
 * @param collectionName collection the document is in
 * @param docName name of the document
 */
export const DeleteDocument = async (collectionName: string, docName: string) => {
  const firestore = useFirebaseFirestore()

  try{
    await deleteDoc(doc(firestore, collectionName, docName))
  }
  catch (e) {
    console.error("Failed to Delete Document: " + e)
  }
}

