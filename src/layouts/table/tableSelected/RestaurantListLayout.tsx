import RestaurantPreview from "@/components/table/tableSelected/RestaurantPreview";
import { Table } from "@/types/Table";
import { Title } from "@mantine/core";

export default function RestaurantListLayout(props: {table: Table}) {
  return(
    <>
    {/* TODO: Add restuarant preview after preference selection*/}
    <RestaurantPreview table={props.table}/>
    </>
  );
}