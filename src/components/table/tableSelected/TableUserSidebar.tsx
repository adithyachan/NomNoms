import { Table } from "@/types/Table";
import { IconCrown } from "@tabler/icons-react";
import { Title } from "@mantine/core";
import { useUser } from "@/providers/AuthProvider";
import UserCard from "./UserCard";

export default function TableUserSidebar(props: {table: Table}) {
  const { user } = useUser();

  return (
    <div className="rounded-3xl bg-white shadow-red-100 shadow-xl p-5 space-y-5">
      <Title className="text-center text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Users</Title>
      <div className="space-y-5">
        <UserCard name={ props.table.leader } email={ props.table.leader } icon={ <IconCrown className="h-5 w-5 fill-amber-500" /> } leaderView={ props.table.leader == user.uid } table={ props.table }/>
        {props.table.users.filter((item) => item != props.table.leader).map((item) => <><UserCard name={ item } email={ item } leaderView={ props.table.leader == user.uid } table={ props.table } /></>) }
      </div>
    </div>
  );
}