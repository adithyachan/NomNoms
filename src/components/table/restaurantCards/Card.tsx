import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
import { Loader } from '@mantine/core';


//import RenderImage from './Image';
export default function ShowCard(props : {url : string, name : string, id : string }) {
    const {data, error, isLoading} = useRestaurantBusinessEndpoint(props.id)
   if(error) {
    console.log(error)
    return <>error</>
   } else if (data) {
    console.log(data)
    return <>data</>
   } else {
    console.log(isLoading)
    return <>isLoading</>
   } 
    // if (error) {
    //     console.log(error)
    //     if (error.code == ("BUSINESS_NOT_FOUND")) {
    //         return (
    //             <Text size="md" color="dimmed">
    //                 The business was not found
    //             </Text> 
    //         )
    //     } else {
    //         return (
    //             <Text size="md" color="dimmed">
    //                 There was an error in the API call
    //             </Text> 
    //         ) 
    //     }
    // } else if (isLoading) {
    //     return <Loader size={100}/>;
    // } else {
    //     return (
    //         <Card shadow="sm" p="lg" radius="md" withBorder>
    //         <Card.Section component="a" href="https://mantine.dev/">
    //             {/* <RenderImage url={'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80'} name={'ABC'}></RenderImage> */}
    //             <Image
    //             src={props.url}
    //             height={160}
    //             alt={props.name}
    //             />
    //         </Card.Section>

    //         <Group position="apart" mt="md" mb="xs">
    //             <Text weight={500}>{props.name}</Text>
    //             <Badge color="pink" variant="light">
    //             On Sale
    //             </Badge>
    //         </Group>

    //         <Text size="sm" color="dimmed">
    //             With Fjord Tours you can explore more of the magical fjord landscapes with tours and
    //             activities on and around the fjords of Norway
    //         </Text>

    //         <Button variant="light" color="blue" fullWidth mt="md" radius="md">
    //             Book classic tour now
    //         </Button>
    //         </Card>
    //     );
  //}
}