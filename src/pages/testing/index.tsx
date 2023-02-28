import CardStack from "@/components/table/restaurantCards/CardStack"
import { useRestaurantBusinessEndpoint, useRestaurantListEndpoint } from "@/lib/utils/yelpAPI"
export default function TestingPage() {
  console.log(useRestaurantListEndpoint(10019, 3200, 'japanese'))
  return(
    <>
      <CardStack ids={['xUAUR4WEsYWaqGZU8MARwQ', 'qYFIIdC7Wx8oN7xRqU82cw', 'YJLz8WSjSqs1NvP5cx-eew', 'Hic-M5Y3YZ-7I_Q5KawaNQ']} />
    </>
  )
}