
import LoadingLayout from "@/layouts/LoadingLayout";
import LoadingMainLogo from "@/components/loaders/LoadingMainLogo";

import { Center } from "@mantine/core";
export default function EmailVerificationLayout() {
    return (
        <>
        <Center>
            <LoadingLayout fullscreen = {true} logo = {true} verification={true}/>
        </Center>
        </>
    );
}