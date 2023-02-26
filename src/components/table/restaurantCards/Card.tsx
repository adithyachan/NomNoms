import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
import { Loader } from '@mantine/core';
import { BackgroundImage, Center } from '@mantine/core';



//import RenderImage from './Image';
export default function ShowCard(props : {id : string }) {
    const {data : businessData, error : businessError , isLoading: isLoadingBusiness} = useRestaurantBusinessEndpoint(props.id)

  //  if(businessError) {
  //   console.log(businessError)
  //   return <>error</>
  //  } else if (businessData) {
  //   console.log(businessData)
  //   return <>data</>
  //  } else {
  //   console.log(isLoadingBusiness)
  //   return <>isLoading</>
  //  } 
    if (businessError) {
        console.log(businessError)
        if (businessError.code == ("BUSINESS_NOT_FOUND")) {
            return (
                <Text size="md" color="dimmed">
                    The business was not found
                </Text> 
            )
        } else {
            return (
                <Text size="md" color="dimmed">
                    There was an error in the API call
                </Text> 
            ) 
        }
    } else if (isLoadingBusiness) {
        return <Loader size={50}/>;
    } else {
        console.log(businessData)
         const nameRestaurant = businessData.name
         const imageUrl = businessData.image_url
         const photos = businessData.photos
         const pricePoint = businessData.price
        return (
            <Card shadow="sm" p="sm"  >
              <BackgroundImage
        src={photos[0]}
        radius="sm"
      >
        {/* <Center p="md"> */}
            
            {/* <RenderImage url={'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'} name={'ABC'}></RenderImage> */}
          
            {/* <Image
            src={imageUrl}
            height={160}
            alt={nameRestaurant}
            /> */}

        <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{nameRestaurant}</Text>
            <Badge color="pink" variant="light">
            {pricePoint}
            </Badge>
        </Group>

        <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
        </Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
        </Button>
        {/* </Center> */}
        </BackgroundImage> 
            
            </Card>
        );
  }
}