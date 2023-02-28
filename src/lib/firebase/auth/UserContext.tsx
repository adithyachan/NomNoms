import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/useFirebase";


//setting an authentication state observer and getting user data
// when user successfully signs in, get information about the user in the observer


export async function useUserStateChange() {
    const auth = useFirebaseAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            return uid;
            console.log(uid);
            // ...
          } else {
            // User is signed out
            // ...
            console.log("user is signed out ")
          }
    });
}
