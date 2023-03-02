import LoadingLayout from "@/layouts/LoadingLayout"
import { useState } from "react"
import { Table } from "@/types/Table";
import { Title } from "@mantine/core";

export default function RestaurantPreview(props: { table: Table }) {
  const [prefsSet, setPrefsSet] = useState(false)

  // if (!prefsSet) {
  //   return <LoadingLayout />
  // }
  

  return (
    <>
      <Title order={2}>{props.table.name}</Title>
      <ul>
        {/* @ts-ignore */}
        {Object.keys(props.table.prefs).map((key) => <li key={key}>{key + ": " + props.table.prefs[key]}</li>)}
      </ul>
    </>
  )
}