
import LoadingLayout from "@/layouts/LoadingLayout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';

import { Center } from "@mantine/core";
export default function EmailVerificationLayout() {
    const oobCode = useRef<null | string>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search)
      oobCode.current = queryParams.get("oobCode");
      if (!oobCode.current) {
        router.push("/auth/login")
      }
    })

    return (
        <>
        <Center>
            <LoadingLayout fullscreen = {true} logo = {true} verification={true}/>
        </Center>
        </>
    );
}