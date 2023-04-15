import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect } from 'react';
import { Center } from "@mantine/core";
import { useUser } from "@/providers/AuthProvider";
import { useRouter } from "next/router";
export default function EmailVerificationLayout() {
    

    const router = useRouter();
    const { user } = useUser()

    useEffect(() => {
        if (user.verified) {
            router.push('/tables')
        }
    }, [user])

    return (
        <>
        <Center>
            <LoadingLayout fullscreen = {true} logo = {true} verification={true}/>
        </Center>
        </>
    );
}