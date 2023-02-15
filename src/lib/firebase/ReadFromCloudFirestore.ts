import { collection, doc, getDocs, getDoc } from "firebase/firestore"; 
import { useFirebaseFirestore } from "./hooks/useFirebase";

/**
 * Reads the document from the collection specified from firestore
 * @param collectionName name of the collection to read
 * @param docName name of the document in the collection to read 
 * @returns Promise of type QueryDocumentSnapshot. Use .data() to extract the actual payload
 */
const ReadDocumentFromCloudFirestore = async (collectionName: string, docName: string) => {
  const firestore = useFirebaseFirestore()
  if (docName) {
    // Get document with name
    const query = await getDoc(doc(firestore, collectionName, docName!))

    // Check if document exists
    if (query.exists()) {
      console.log("Document: " + query)
      return query
    }

    // document does not exist
    console.error("Document, " + docName + ", in collection, " + collectionName + ", does not exist!")
    return undefined
  }
}

/**
 * Reads an entire collection from firestore
 * @param collectionName name of the collection to read
 * @return Promise of type QuerySnapshot<DocumentData>. Use .docs to get all documents in the collection
 */
const ReadCollectionFromCloudFirestore = async (collectionName: string) => {
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

export { ReadDocumentFromCloudFirestore, ReadCollectionFromCloudFirestore }