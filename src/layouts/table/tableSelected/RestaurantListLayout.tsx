import RestaurantPreview from "@/components/table/tableSelected/RestaurantPreview";
import { Table } from "@/types/Table";
import { Center, Button, Title } from "@mantine/core";

export default function RestaurantListLayout(props: {data: any[]}) {

  return(
    <>
      { <RestaurantPreview data={props.data} /> }
    </>
  );
}