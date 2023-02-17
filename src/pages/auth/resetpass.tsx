/* TODO: Make reset password page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { Alert } from "@mantine/core";
import { sendPasswordResetEmail } from "firebase/auth";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import ResetPassLayout from "@/layouts/auth/ResetPassLayout"

export default function ResetPass() {
    
    const [email, updateEmail] = useState("");
    
    const [error, setError] = useState("");
    const router = useRouter();

    const handleReset = async (e : any) => {
        //console.log("helloworld");
        e.preventDefault();
        const auth = useFirebaseAuth();
        //fix edge cases  
        sendPasswordResetEmail(auth, email).then(() => {
          router.push('/auth/inputresetpass')
        }).catch(error => {
            setError(error.message);
        });
    };
    
    return (
        /* html type
        <>
            <>Enter your email: </>
            <input onChange={ (e) => {setEmail(e.currentTarget.value)} } value={email}></input>
            <button onClick={ reset }>Reset Password</button>      
        </>
        */
       //NextJS form component
       /*
       <div>
       <form onSubmit={(e) => handleReset(e)}>  
       { error && <Alert color="danger">{error}</Alert>}
         <input
           type="email"
           placeholder = "Please enter your email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
 
         <button type="submit">Submit</button>
       </form>
        </div>
        */
       <>
       <ResetPassLayout updateEmail={updateEmail}/>
       </>
    );
}