import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect } from 'react';
import { Center } from "@mantine/core";
import { useRouter } from "next/router";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useUser } from "@/providers/AuthProvider";
export default function EmailVerificationLayout() {
    const router = useRouter();
    const auth = useFirebaseAuth();
    const { user } = useUser()

    useEffect(() => {
        if (auth.currentUser?.emailVerified) {
            router.push('/tables')
        }
    }, [auth])

    return (
        <>
        <Center>
            <LoadingLayout fullscreen = {true} logo = {true} verification={true}/>
        </Center>
        </>
    );
}