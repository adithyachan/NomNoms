import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';
import { Text } from '@mantine/core'
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useUser } from "@/providers/AuthProvider";

export default function EmailVerifiedLayout() {
    const oobCode = useRef<null | string>(null);
    const router = useRouter();
    const [error, setError] = useState(true);
    const auth = useFirebaseAuth();
    const { user } = useUser();
    
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search)
      oobCode.current = queryParams.get("oobCode");
      if (!oobCode.current) {
        setError(true)
        router.push('/')
      } else {
        setError(false)
        console.log("VERIFIED pre (verified page): " + user.verified)
        auth.currentUser?.reload();
        console.log("VERIFIED post (verified page): " + user.verified)
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