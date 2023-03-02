import CardStack from "@/components/table/restaurantCards/CardStack";
import { useRestaurantListEndpoint } from "@/lib/utils/yelpAPI";
import { Loader } from "@mantine/core";

export default function Voting() {
  const {data: listData, error: listError, isLoading: listIsLoading} = useRestaurantListEndpoint(10019, 3200, 'chinese');
  if (listError) {
    return (<>Error loading restaurants</>)
  }
  if (listIsLoading) {
    return (<Loader color='FF5858' />)
  } else {
    const ids = listData.businesses.map((business: any) => business.id)
    return(
      <CardStack ids={ids} />
    )
  }
}