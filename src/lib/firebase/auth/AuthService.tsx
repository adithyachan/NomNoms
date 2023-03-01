import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase"
import {signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signOut, GithubAuthProvider } from "firebase/auth";
import { StringLiteral } from "typescript";
import { sendEmailVerification, signInAnonymously } from "firebase/auth";


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

const facebookprovider = new FacebookAuthProvider();
export async function CreateAccountWithFacebook() {
  const auth = useFirebaseAuth();
  signInWithPopup(auth, facebookprovider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  console.log("checking facebook")  
  
}

export async function CreateAccountWithGitHub() {
	const provider = new GithubAuthProvider();
	const auth = useFirebaseAuth();
 signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
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
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
}

export async function SignInAsGuest() {
  const auth = useFirebaseAuth();
  signInAnonymously(auth)
  .then(() => {
    // Signed in..
    console.log("signed in as guest");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ...
  });
}

export async function SignOutofAccount() {
	const auth = useFirebaseAuth();
    signOut(auth).then(() => {
		// Sign-out successful.
	  }).catch((error) => {
		// An error happened.
	  });
}

