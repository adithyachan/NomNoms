import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import InputResetPassLayout from '@/layouts/auth/InputResetPassLayout';
import EmailVerifiedLayout from '@/layouts/auth/EmailVerifiedLayout';

export default function RouteFire() {

    const modeCode = useRef<null | string>(null);
    const oobCode = useRef<null | string>(null);
    const router = useRouter()
    const [mode, setMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        oobCode.current = queryParams.get("oobCode");
        modeCode.current = queryParams.get("mode");
        if (!oobCode.current) {
          router.push("/auth/login")
        } else {
            if (modeCode.current == "resetPassword") {
                setMode(true);
            } else {
                setMode(false);
            }
            setLoading(false)
        }
      })




return(
    <>
    {loading ?     
    <>
    </>
    :
    <>

        {mode ?
        <>
        <InputResetPassLayout oobCode={oobCode.current?.toString()}/>
        </> 
        :
        <>
        <EmailVerifiedLayout oobCode={oobCode.current?.toString()}/>
        </>
        }
    </>
    }
    </>

);
}