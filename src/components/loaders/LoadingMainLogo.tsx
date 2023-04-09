import { Flex, Image, Center, Loader, Text } from "@mantine/core"

export default function LoadingMainLogo(props: {verification?: boolean}) {
  return (
    <Flex justify="center"
    align="center"
    direction="column">
      <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo"/>
      {props.verification ? 
      <Text 
        className="mb-10 text-6xl tracking-normal leading-normal font-black" 
        variant="gradient" 
        gradient={{from: "red.7", to: "red.4"}}>
          Awaiting Email Verification
      </Text> 
      : 
      <></>
      } 
        <Loader className="align-baseline" color="red" size={120} variant="dots" />
    </Flex>
  )
}