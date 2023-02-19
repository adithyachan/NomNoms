import CreateJoinTableTabs from "@/components/table/tableSelection/CreateJoinTablesTabs";
import { useState } from "react";
import { Center, Text } from "@mantine/core";


export default function CreateJoinTableLayout() {
  const [activeTab, setActiveTab] = useState<string | null>('Join');

  return (
    <Center className="flex-col rounded-3xl shadow-red-100 shadow-xl bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 m-10">
      <Text className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Have a Seat</Text>
      <CreateJoinTableTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </Center>
  )
}