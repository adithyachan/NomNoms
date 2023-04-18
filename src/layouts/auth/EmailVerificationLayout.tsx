import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";

export default function EmailVerificationLayout() {
    const router = useRouter();
    const auth = useFirebaseAuth();

    useEffect(() => {
      if (!auth.currentUser) {
        router.push('/')
      } else {
        const interval = setInterval(() => {
            auth.currentUser?.reload()
            .then(() => {
                console.log("AUTH: " + auth.currentUser?.email)
                console.log("VERIFICATION: " + auth.currentUser?.emailVerified)
              if(auth.currentUser?.emailVerified){
                clearInterval(interval)
                router.push('/tables')
              }
            })
            .catch((err) => {
              alert(err.message)
            })
          }, 1000)
      }
    }, [auth.currentUser])


    return (
        <>
        {auth.currentUser ?
            <LoadingLayout fullscreen = {true} logo = {true} verification={true}/>
            :
            <></>
        }
        </>
    );
}