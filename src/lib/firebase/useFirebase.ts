import { FirebaseOptions, initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// set up config
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

/**
 * Get firebase app if it exists, else init
 * 
 * @returns firebase app
 */
export function useFirebaseApp() {
  if (getApps().length == 0) {
    console.log("Application was successfully initialized")
    return initializeApp(firebaseConfig)
  }
  
  return getApp()
}

/**
 * Get firestore
 * 
 * @returns firestore
 */
export function useFirebaseFirestore() {
  // Use app 
  const app = useFirebaseApp()

  // Get firestore
  const firestore = getFirestore(app)

  return firestore 
}

/**
 * Get auth
 * 
 * @returns auth
 */
export function useFirebaseAuth() {
  // Use app
  const app = useFirebaseApp()

  // Get auth 
  const auth = getAuth(app)

  return auth

}