import { BackgroundImage, Title, Rating, Button, Text, Flex } from "@mantine/core"
import { IconPhone } from "@tabler/icons-react"
import { useRouter } from "next/router"

const defaultImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"

export default function RestaurantPreviewCard(props: {data: any}) {
  const restaurant = props.data
  const router = useRouter()
  
  return (
    <div className="shadow-lg shadow-rose 200 rounded-2xl transition ease-in-out hover:shadow-xl hover:shadow-rose-300 duration-300 delay-75 w-full">
      <BackgroundImage src={restaurant.image_url ?? defaultImage} className="w-full h-32 rounded-2xl">
        <div className="h-full w-full bg-gray-800/60 rounded-2xl flex justify-end items-center">
          <div className="w-full ml-5 mt-3">
            <Title className="ResTitle" color="white" order={3}>{restaurant.name.length > 15 ? restaurant.name.substring(0, 15) + "..." : restaurant.name} <span className="text-red-500">{restaurant.price ?? ""}</span></Title>
            <small className="text-white -mt-1">{restaurant.location ? restaurant.location.address1 : null}</small>
            <Rating defaultValue={restaurant.rating} fractions = {2} readOnly size = "md" className="mt-2"/>
            <small className="text-white">{restaurant.review_count} Reviews</small>
          </div>
          <div>
            <Button component="a" radius="lg" color="red" className="mr-5" target="_blank" href={restaurant.url}>
              Learn More
            </Button>
            <Flex className="mt-3" align="center">
                {restaurant.display_phone ?
                <>
                  <IconPhone style = {{paddingRight :'-10px'}} color = 'white' strokeWidth={1} /> 
                  <Text className="text-white -mt-1 text-xs">
                      {restaurant.display_phone}
                  </Text>
                </>  
                : null}
            </Flex>
          </div>
        </div>
      </BackgroundImage>
    </div>
  )
}