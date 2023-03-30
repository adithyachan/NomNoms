import RestaurantIndividualPreview from "@/components/table/tableSelected/RestaurantIndividualPreview";
import { Table } from "@/types/Table";

export default function RestaurantListLayout(props: {data: any[]}) {
  return(
    <>
      { <RestaurantIndividualPreview data={props.data} /> }
    </>
  );
}