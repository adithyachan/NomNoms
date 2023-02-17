import { Flex, Image, Center, Loader } from "@mantine/core"

export default function Loading() {
  return (
    <Flex direction="column">
      <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo"/>
      <Center>
        <Loader className="align-baseline" color="red" size={120} variant="dots" />
      </Center>
    </Flex>
  )
}