import { Center, Flex, Image, Loader } from "@mantine/core";

export default function LoadingLayout(props: {fullscreen: boolean}) {
  return(
    <Center className={props.fullscreen ? "min-h-screen" :"min-h-full"}>
      <Flex direction="column">
        <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo"/>
        <Center>
          <Loader className="align-baseline" color="red" size={120} variant="dots" />
        </Center>
      </Flex>
    </Center>
  );
}