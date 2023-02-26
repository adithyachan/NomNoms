import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase"
import {signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { StringLiteral } from "typescript";

export async function CreateAccountEmailandPassword(email:string, password:string) {
	const auth = useFirebaseAuth();
	createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
	console.log("User was sucessfully created")
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	console.log("Account creation was unsuccessful")
    // ..
  });
}

export async function SignUpWithGoogle() {
	const provider = new GoogleAuthProvider();
	const auth = useFirebaseAuth();
	signInWithPopup(auth, provider)
	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;
		// The signed-in user info.
		const user = result.user;
		// IdP data available using getAdditionalUserInfo(result)
		// ...
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		// ...
	});
}