import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useFirebaseFirestore } from './useFirebase'
import Table from '../../types/Table'
import User from '../../types/User'

/** 
 * writeToCloudFirestore(col: string, doc: string, data: any)
 * Handles writing data to cloud firestore
 * 
 * @param {string} col 
 * @param {*} data 
 * @param {string} doc 
 */
const WriteToCloudFirestore = async (collectionName: string, data: Table | User , docName? : string | undefined) => {
    const firestore = useFirebaseFirestore()

    console.log(firestore)
    console.log(collectionName)
    console.log(data)

    try {
        if (docName) {
            await setDoc(doc(firestore, collectionName, docName!), data);
            console.log("Document written with ID: ", docName);
        }
        else {
            const docRef = await addDoc(collection(firestore, collectionName), data);
            console.log("Document written with ID: ", docRef.id);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export default WriteToCloudFirestore