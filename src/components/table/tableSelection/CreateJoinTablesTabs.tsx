import { Tabs } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import CreateTable from "./CreateTable";
import JoinTable from "./JoinTable"

export default function CreateJoinTableTabs(props: { activeTab: string | null, setActiveTab: Dispatch<SetStateAction<string | null>> }) {
  return (
    <Tabs color="red" value={props.activeTab} onTabChange={props.setActiveTab} className="min-w-full mx-10 bg-pink-50 rounded-3xl p-10">
      <Tabs.List className="justify-evenly">
        <Tabs.Tab className="w-1/2" value="Create">Create</Tabs.Tab>
        <Tabs.Tab className="w-1/2" value="Join">Join</Tabs.Tab>
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