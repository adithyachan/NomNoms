import { Button, Rating, useMantineTheme, Text, Card, Overlay, Group} from "@mantine/core";
import IconPhoneCall, { IconPhone } from '@tabler/icons-react';

export default function RestaurantBest(props : {data : any}) {
    const theme = useMantineTheme();
    const restaurantData = props.data
    const rating = restaurantData.rating
    var ratingExists = true
    if (rating == undefined) {
      ratingExists = false
    }
    const reviewNo = restaurantData.review_count
    var reviewExists = true
    if (reviewNo == undefined) {
        reviewExists = false
    }
    const nameRestaurant = restaurantData.name
    var imageUrl =  restaurantData.image_url
    if (imageUrl == undefined) {
        imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    }   
    const pricePoint = restaurantData.price
    var priceExists = true
    if (pricePoint == undefined) {
        priceExists = false
    }
    const url = restaurantData.url
    var urlExists = true
    if (url == undefined) {
        urlExists = false
    }
    const number = restaurantData.display_phone
    var phoneExists = true
    if (number == undefined) {
        phoneExists = false
    }
    return (
        <div  className="shadow-lg shadow-rose 200 rounded-2xl transition ease-in-out hover:shadow-xl hover:shadow-rose-300 duration-300 delay-75">
            <div style={{ height: '266px', width: '400px'}}>
                <Card shadow="sm" radius="lg" 
                style={{ height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundImage:`url(${imageUrl})`,
                    opacity : 1,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position : 'relative'
                    
                }}>
                    <Overlay gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`} zIndex={0} opacity = '0.5'/>
                    <div style={{ position: 'absolute',
                        top: '18%',
                        left: 20,
                        transform: 'translateY(-50%)'
                    }}>
                        <Text color = "white"
                        style={{  borderColor : "purple", 
                            fontSize: '24px',
                            fontWeight: 700
                        }}>
                        {nameRestaurant+ " "}
                            <span className="text-red-500">
                                ({pricePoint ?? "?"})
                            </span> 
                        </Text>
                    </div>
                    <div style={{ position: 'absolute',
                        top: '40%',
                        left: 22,
                        
                    }}>
                        <Text className="text-white -mt-1">
                            {restaurantData.location ? restaurantData.location.address1 : null}
                        </Text>         
                    </div>
                    <div style={{ position: 'absolute',
                        top: '50%',
                        left: 15,
                    }}> 
                    {
                        ratingExists &&
                        <Rating value={rating} fractions = {2} readOnly size = "md" style = {{padding :'5px'}}/>
                    }
                    </div>
                    <div style={{ position: 'absolute',
                        top: '65%',
                        left: 22,
                    }}> 
                    {
                        reviewExists && 
                        <Text className="text-white -mt-1">
                            {reviewNo} Reviews
                        </Text>
                    }
                    </div>
                    {
                        phoneExists && 
                        <div style={{ position: 'absolute',
                            top: '65%',
                            right: 22,
                        }}> 
                            <Group position="center" spacing="xs">
                                <IconPhone style = {{paddingRight :'-10px'}} color = 'white' strokeWidth={1} /> 
                                <Text className="text-white -mt-1">
                                    {number}
                                </Text>
                            </Group>
                        </div> 
                    }
                    <div style={{ zIndex:1, 
                        transform: 'translateX(-50%)' , 
                        position: 'absolute',
                        bottom: 10,
                        left : '50%',
                        padding: '12px' }}>
                    {
                        urlExists && 
                        <Button className="mr-5" component = "a"  target = '_blank' color='red' opacity={0.8} radius="lg" href = {url} >
                        Learn More
                        </Button>
                    }
                    </div>
                </Card> 
            </div>
        </div>
    )
}