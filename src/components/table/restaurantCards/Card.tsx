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
         const url = businessData.url
         const aspectRatio = 16/9; // Set the aspect ratio of the container element

  return (
    <div
      style={{
        height : '100%',
        borderRadius :'10px',
        width: '100%',
        maxWidth: 600,
        paddingBottom: `${100 / aspectRatio}%`, // Set the paddingBottom property to maintain aspect ratio
        position: 'relative', // Set the position property to allow the Card component to cover the entire container
      }}
    >
    <Card
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        height: '50%',
        backgroundImage: `url(${imageUrl})`,
        opacity : 0.9,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: 'inherit'
      }}
      shadow="sm" radius="lg" p = "lg"
    >
      <div style={{ position: 'absolute', top: 0,  right: 0, padding: '12px' }}>
      <Badge color="pink" variant="light">
              {pricePoint}
              </Badge>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)'
        }}>

      <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{nameRestaurant}</Text>
              
          </Group>  
          </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px' }}>
      <Button component = "a" variant="light" color="pink" fullWidth mt="md" radius="md" href = {url}>
          Go to site
        </Button>
        </div>
    </Card>
    </div>
  );
 
    
   

  

     
        // <Button component = "a" variant="light" color="blue" fullWidth mt="md" radius="md" href = {url}>
        //     Go to site
        // </Button>
        {/* </Center> */}
        // </BackgroundImage> 
          
        //     </Card>
        
  }
}