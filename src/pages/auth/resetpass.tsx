/* TODO: Make reset password page */
import ResetPassLayout from "@/layouts/auth/ResetPassLayout"
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export default function ResetPass() {

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
        <MantineProvider >
        <NotificationsProvider>
          <ResetPassLayout />
        </NotificationsProvider>
      </MantineProvider>
    );
}