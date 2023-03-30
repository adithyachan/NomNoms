import RestaurantIndividualPreview from "@/components/table/tableSelected/RestaurantIndividualPreview";
import { Table } from "@/types/Table";
import { Title } from "@mantine/core";

export default function RestaurantListLayout(props: {table: Table}) {
  return(
    <>
    {/* TODO: Add restuarant preview after preference selection*/}
    <RestaurantIndividualPreview table={props.table}/>
    </>
  );
}