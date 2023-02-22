/* TODO: Make Create Account Page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { CreateAccountEmailandPassword } from "@/lib/firebase/auth/AuthService";
import CreateAccountLayout from "@/layouts/auth/CreateAccountLayout"
import { signInAnonymously, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



export default function CreateAccount() {
  //create-account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleCreate = async (e : any) => {
      console.log("working");
      e.preventDefault();
      const auth = useFirebaseAuth();
      CreateAccountEmailandPassword(email, password)
  };

  


  return (
      
     //NextJS form component
     /*<div>
     <form onSubmit={(e) => handleCreate(e)}>
       <input
         type="email"
         placeholder = "Email Address"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       />
       <text>{"\n"}</text>
       <input
         type="password"
         placeholder = "Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />
       <text>{"\n"}</text>
       <input
         type="confirmpassword"
         placeholder = "Confirm Password"
         value={confirmpassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
       />
       <text>{"\n"}</text>
       <button type="submit">Create Account</button>
     </form>

     
      </div>
  );*/
  <>
    < CreateAccountLayout/>
  </>
  );
}

const provider = new GoogleAuthProvider();
 
export async function CreateAccountWithGoogle() {
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


