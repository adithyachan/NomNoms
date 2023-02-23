import LoadingMainLogo from "@/components/LoadingMainLogo";
import { Center } from "@mantine/core";

export default function LoadingLayout(props: {fullscreen?: boolean}) {
  return(
    <Center className={props.fullscreen ? "min-h-screen" : "min-h-full"}>
      <LoadingMainLogo />
    </Center>
  );
}