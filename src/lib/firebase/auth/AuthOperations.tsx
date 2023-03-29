import { IUser, User } from "@/types/User";
import { collection, doc, QueryDocumentSnapshot, onSnapshot, query, DocumentSnapshot } from "firebase/firestore";
import { WriteDocumentWithConverter, DeleteDocument } from "../FirestoreOperations";
import { useFirebaseFirestore } from "../hooks/useFirebase";

// Name of collection to use
const collectionName = "users";

// Converter function to go from data to user object
const userConverter = {
  toFirestore: (user: User) => {
      return {
          uid: user.uid,
          username: user.username,
          email: user.email,
          tables: user.tables
        };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot | DocumentSnapshot) => {
    try {
      const data = (snapshot.data() as IUser);
      return new User(data);
    }
    catch (err) {
      throw err
    }
      
  }
};

/**
 * Reads user with the given id
 * @param docName The user id
 * @returns 
 */
export const ReadUser = (docName: string, setDoc: any) => {
  const firestore = useFirebaseFirestore()
  try {
    const unsub = onSnapshot(doc(firestore, collectionName, docName), (doc) => {
      const converted = userConverter.fromFirestore(doc)
      setDoc(converted)
    });

    return unsub
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Reads all users
 * @returns object containing all users
 */
export const ReadUsers =  (setDocs: any) => {
  const firestore = useFirebaseFirestore()
  try {
    const q = query(collection(firestore, collectionName));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const docs: User[] = [];
      querySnapshot.forEach((doc) => {
          const converted = userConverter.fromFirestore(doc)
          docs.push(converted);
      });
      setDocs(docs)
    });

    return unsub
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Writes a User object to the firestore
 * @param data User object to write
 * @returns id of the object that was written
 */
export const WriteUser = async (data: IUser) => {
  const firestore = useFirebaseFirestore()
  try {
    const docRef = doc(collection(firestore, collectionName), data.uid).withConverter(userConverter);
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
export const UpdateUser = async (data: IUser) => {
  const firestore = useFirebaseFirestore()
  try {
    const docRef = doc(collection(firestore, collectionName), data.uid).withConverter(userConverter);
    const table = await WriteDocumentWithConverter(docRef, data)
    return table
  }
  catch (e) {
    console.error("Error reading table: " + e)
    throw e
  }
}

/**
 * Delete User of the given id
 * @param docName id of the User to delete
 */
export const DeleteUser = async (docName: string) => {
  try {
    const table = (await DeleteDocument(collectionName, docName))
  }
  catch (e) {
    console.error("Error deleting table: " + e)
    throw e
  }
}