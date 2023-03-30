import RestaurantPreview from "@/components/table/tableSelected/RestaurantPreview";

export default function RestaurantListLayout(props: {data: any[]}) {

  return(
    <>
      { <RestaurantPreview data={props.data} /> }
    </>
  );
}