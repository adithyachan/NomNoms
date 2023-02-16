/* TODO: Make reset password page */
import { useState } from "react";

const reset = () => {

}
export default function resetPass() {
    const [email, setEmail] = useState("");
    return (
        <>
            <>Enter your email: </>
            <input onChange={ (e) => {setEmail(e.currentTarget.value)} } value={email}></input>
            <button onClick={ reset }>Reset Password</button>      
        </>
    );
}