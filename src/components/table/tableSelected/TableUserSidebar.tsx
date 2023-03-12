import { Table } from "@/types/Table";
import { IconCrown } from "@tabler/icons-react";
import UserCard from "./userCard";
import { Title } from "@mantine/core";

export default function TableUserSidebar(props: {table: Table}) {
  return (
    <div className="rounded-3xl bg-white shadow-red-100 shadow-xl p-5 space-y-5">
      <Title className="text-center text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Users</Title>
      <div className="space-y-5">
        <UserCard name={props.table.leader} email={props.table.leader} icon={ <IconCrown className="h-5 w-5 fill-amber-500" /> }/>
        {props.table.users.filter((user) => user != props.table.leader).map((user) => <><UserCard name={user} email={user} /></>) }
      </div>
    </div>
  );
}