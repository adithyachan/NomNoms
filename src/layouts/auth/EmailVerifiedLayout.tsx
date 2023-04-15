import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';
import { Text } from '@mantine/core'
import { useUser } from "@/providers/AuthProvider";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";

export default function EmailVerifiedLayout() {
    const oobCode = useRef<null | string>(null);
    const router = useRouter();
    const [error, setError] = useState(true);
    const auth = useFirebaseAuth();
    
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search)
      oobCode.current = queryParams.get("oobCode");
      if (!oobCode.current) {
        setError(true)
        router.push('/')
      } else {
        setError(false)
      }
    })

    return (
        <>
        {error ?
        <></>
        :
        <Text>
        Hello, your email has been verified
        </Text>
        }
        </>
    );
}