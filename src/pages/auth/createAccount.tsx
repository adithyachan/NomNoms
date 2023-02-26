/* TODO: Make Create Account Page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
//import { CreateAccountEmailandPassword } from "@/lib/firebase/auth/AuthService";
import CreateAccountLayout from "@/layouts/auth/CreateAccountLayout"
import { signInAnonymously, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";



export default function CreateAccount() {
  //create-account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  /*const handleCreate = async (e : any) => {
    const auth = useFirebaseAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    console.log("working")
  }*/
  return(
  <>
    < CreateAccountLayout/>
  </>
  );
}

const provider = new GoogleAuthProvider();
 
export async function CreateAccountWithGoogle() {
  console.log("checking google")  
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
  return (
    <>
    < CreateAccountLayout/>
    </>
  ); 
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
  return (
    <>
    < CreateAccountLayout/>
    </>
  ); 
}
