import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';
import { Text } from '@mantine/core'
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { applyActionCode } from "firebase/auth";

export default function EmailVerifiedLayout() {
    const oobCode = useRef<null | string>(null);
    const router = useRouter();
    const [error, setError] = useState(false);
    const auth = useFirebaseAuth()
    const [first, setFirst] = useState(true)
    
    useEffect(() => {
      if (first) {
        console.log("here twice")
        const queryParams = new URLSearchParams(window.location.search)
        oobCode.current = queryParams.get("oobCode");
        console.log(oobCode.current)
        if (!oobCode.current) {
          setError(true)
          router.push('/')
        } else {
          applyActionCode(auth, oobCode.current.toString()).then(() => {
          }).catch((error) => {

          })  
        }
        setFirst(false)
      }
    })


    return (
        <>
        {error ?
        <></>
        :
        <Text>
          Hello, your email has been verified.
        </Text>
        }
        </>
    );
}