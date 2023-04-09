import LoadingLayout from "@/layouts/LoadingLayout";
import { useEffect, useState } from 'react';
import { Center, Text } from "@mantine/core";
import { useUser } from "@/providers/AuthProvider";
export default function EmailVerificationLayout() {

    const { user } = useUser()
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

    }, [])
    
    return (
        <>
        <Center>
            <LoadingLayout fullscreen = {true} logo = {true} verification={true}/>
        </Center>
        </>
    );
}