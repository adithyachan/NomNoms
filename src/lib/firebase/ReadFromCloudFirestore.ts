import { collection, doc, getDocs, getDoc } from "firebase/firestore"; 
import { useFirebaseFirestore } from "./useFirebase";

const ReadFromCloudFirestore = async (collectionName: string, docName?: string | undefined) => {
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
    console.error("Document" + query + "does not exist!")
    return undefined
  }
  else {
    // return all docs in the collection
    const query = await getDocs(collection(firestore, collectionName));
    return query.docs
  }
  
  
}

export default ReadFromCloudFirestore