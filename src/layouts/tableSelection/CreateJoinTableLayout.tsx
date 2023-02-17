import CreateJoinTableTabs from "@/components/table/tableSelection/CreateJoinTablesTabs";
import { useState } from "react";
import { Container, Center, Title } from "@mantine/core";

export default function CreateJoinTableLayout() {
  const [activeTab, setActiveTab] = useState<string | null>('Create');

  return (
    <Center className="min-h-screen pb-60 flex-col">
      <Title order={1} className="mb-10">Have A Seat</Title>
      <CreateJoinTableTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </Center>
  )
}