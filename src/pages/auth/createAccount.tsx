/* TODO: Make Create Account Page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { CreateAccountEmailandPassword } from "@/lib/firebase/auth/AuthService";
import CreateAccountLayout from "@/layouts/auth/CreateAccountLayout"



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
 
