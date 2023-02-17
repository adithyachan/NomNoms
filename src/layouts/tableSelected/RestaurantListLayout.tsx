import RestaurantPreview from "@/components/table/RestaurantPreview";
import { Title } from "@mantine/core";

export default function RestaurantListLayout() {
  return(
    <>
    {/* TODO: Add restuarant preview after preference selection*/}
    <Title order={1}>Restaurant Preview</Title>
    <RestaurantPreview />
    </>
  );
}