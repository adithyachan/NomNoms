import Loading from "@/components/loaders/Loading";
import LoadingMainLogo from "@/components/loaders/LoadingMainLogo";
import { Center } from "@mantine/core";

export default function LoadingLayout(props: {fullscreen?: boolean, logo?: boolean}) {
  return(
    <Center className={props.fullscreen ? "min-h-screen" : "min-h-full"}>
      {props.logo ? <LoadingMainLogo /> : <Loading />}
    </Center>
  );
}