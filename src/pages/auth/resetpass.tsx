/* TODO: Make reset password page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export default function resetPass() {
    const [email, setEmail] = useState("");

    const handleReset = async (e : any) => {
        console.log("helloworld");
        e.preventDefault();
        const auth = useFirebaseAuth();
        //fix edge cases
        sendPasswordResetEmail(auth, email);
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
       <div>
       <form onSubmit={(e) => handleReset(e)}>
         <input
           type="email"
           placeholder = "Please enter your email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
 
         <button type="submit">Submit</button>
       </form>
        </div>
    );
}