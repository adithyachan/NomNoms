import Loading from "@/components/Loading";
import { Center } from "@mantine/core";

export default function LoadingLayout(props: {fullscreen: boolean}) {
  return(
    <Center className={props.fullscreen ? "min-h-screen" :"min-h-full"}>
      <Loading />
    </Center>
  );
}