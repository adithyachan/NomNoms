import { Flex, Image, Center, Loader } from "@mantine/core"

export default function Loading() {
  return (
    <Flex direction="column">
      <Center>
        <Loader className="align-baseline" color="red" size={120} variant="bars" />
      </Center>
    </Flex>
  )
}