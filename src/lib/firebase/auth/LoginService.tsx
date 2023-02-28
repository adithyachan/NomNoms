import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getUserStateChange } from "./UserContext";

export async function SignInEmailandPassword(email:string, password:string) {
    const auth = useFirebaseAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        getUserStateChange();
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

