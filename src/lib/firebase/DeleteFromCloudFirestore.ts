import { doc, deleteDoc } from "firebase/firestore";
import { useFirebaseFirestore } from "./hooks/useFirebase";

const DeleteDocumentFromCloudFirestore = async (collectionName: string, docName: string) => {
  const firestore = useFirebaseFirestore()
  try{
    await deleteDoc(doc(firestore, collectionName, docName))
  }
  catch (e) {
    console.error("Failed to Delete Document: " + e)
  }
}

export { DeleteDocumentFromCloudFirestore }

