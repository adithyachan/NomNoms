/* TODO: Make Create Account Page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
//import { CreateAccountEmailandPassword } from "@/lib/firebase/auth/AuthService";
import CreateAccountLayout from "@/layouts/auth/CreateAccountLayout"
import CreateUsernameLayout from "@/layouts/auth/CreateAccountLayout"

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
  return (
    <>
    < CreateAccountLayout/>
    </>
  ); 
}

const facebookprovider = new FacebookAuthProvider();
export async function CreateAccountWithFacebook() {
  const auth = useFirebaseAuth(); 
  return (
    <>
    < CreateAccountLayout/>
    </>
  ); 
}
