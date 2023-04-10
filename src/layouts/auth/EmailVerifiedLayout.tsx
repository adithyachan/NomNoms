import { useRouter } from "next/router";
import { useEffect, useRef } from 'react';

export default function EmailVerifiedLayout() {
    const oobCode = useRef<null | string>(null);
    const router = useRouter();
    
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search)
      oobCode.current = queryParams.get("oobCode");
      if (!oobCode.current) {
        router.push("/auth/login")
      } else {
        router.push('/tables')
      }
    })

    return (
        <>
        </>
    );
}