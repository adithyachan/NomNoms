import { Tabs, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import CreateTable from "./createTable/CreateTable";
import JoinTable from "./joinTable/JoinTable"

export default function CreateJoinTableTabs(props: { activeTab: string | null, setActiveTab: Dispatch<SetStateAction<string | null>> }) {
  return (
    <Tabs color="red" value={props.activeTab} onTabChange={props.setActiveTab} className="min-w-full mx-10 bg-rose-100 shadow-rose-200 rounded-3xl p-10 shadow-lg transition-all ease-in-out hover:shadow-xl hover:shadow-red-300 delay-100 duration-500">
      <Tabs.List className="justify-evenly border-b-2 border-b-gray-400">
        <Tabs.Tab className="w-1/2" value="Create">
          <Text className="text-lg font-black" color={props.activeTab == "Create" ? "red.8" : "dark.2"}>
            Create
          </Text>
        </Tabs.Tab>
        <Tabs.Tab className="w-1/2" value="Join">
          <Text className="text-lg font-black" color={props.activeTab == "Join" ? "red.8" : "dark.2"}>
            Join
          </Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Create">
        <CreateTable />
      </Tabs.Panel>
      <Tabs.Panel value="Join">
        <JoinTable />
      </Tabs.Panel>
    </Tabs>
  );
}