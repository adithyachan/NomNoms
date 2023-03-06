import { Center, Image, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";

export default function TableNotFound() {
  const router = useRouter()

  return (
    <Center className="flex-col min-h-screen">
      <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo"/>
      <Title order={5} className="text-center">The table you are looking for does not exist.</Title>
      <Text size="sm" component="a" variant="link" color="red" onClick={() => router.push("/")}>Back to Home</Text>
    </Center>
  );
}