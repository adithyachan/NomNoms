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
  const aspectRatio = 16/9;
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
      return (
        <div
      style={{
        height : '100%',
        borderRadius :'10px',
        width: '100%',
        maxWidth: 600,
        paddingBottom: `${100 / aspectRatio}%`, 
        position: 'relative', // Set the position property to allow the Card component to cover the entire container
        //backgroundColor: '#f5d6d8', 
      }}
    >
    <Card
    
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        height: '50%',
        //backgroundColor: '#f5d6d8',
        borderRadius: 'inherit'
      }}
      shadow="sm" radius="lg" p = "lg"
    >
      <Center style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Loader size={50} color="#FF5858"/>
    </Center></Card></div>
      
      );
    } else {
        console.log(businessData)
         const nameRestaurant = businessData.name
         const imageUrl = businessData.image_url
         const photos = businessData.photos
         const pricePoint = businessData.price
         const url = businessData.url
         const cuisines = businessData.categories
         const cuisineList = new Array(cuisines.length)
         for(var i = 0;i < cuisines.length;i++) {
          cuisineList[i] = cuisines[i].title;
         }
         //console.log(cuisineList)

  return (
    <div
      style={{
        height : '100%',
        borderRadius :'10px',
        width: '100%',
        maxWidth: 600,
        paddingBottom: `${100 / aspectRatio}%`, 
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
        backgroundImage:`url(${imageUrl})`,

        opacity : 0.75,
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
          left: 11,
          transform: 'translateY(-50%)'
        }}>
        <Text className="css-1se8maq" style={{ color:"white", fontSize: '24px', fontWeight: 700 }}>{nameRestaurant}</Text>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: 11,
          transform: 'translateY(-50%)'
        }}>
        <Text className="css-1se8maq" style={{ color:"white", fontSize: '12px', fontWeight: 600 }}>{cuisineList.join(', ')}</Text>
      </div>
      

      <div style={{ transform: 'translateX(-50%)' , position: 'absolute', bottom: 0,left : '50%', padding: '12px' }}>
        <Button component = "a" variant="light" color="pink"  mt="md" radius="md" href = {url} size = "md">
          Go to site
        </Button>
      </div>
    </Card>
    </div>
  );
 
    
   


        
  }
}