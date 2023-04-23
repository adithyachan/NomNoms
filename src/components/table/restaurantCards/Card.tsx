import { Card,  Text, Badge, Button, Group, Popover, Overlay,useMantineTheme, Modal ,Rating } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
import { Loader } from '@mantine/core';
import GetHours from './HoursOfOperation';
import { Table } from '@mantine/core';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import RestImages from './Photos';


//import RenderImage from './Image';
export default function ShowCard(props : {id : string }) {
  const theme = useMantineTheme();
  //const [opened, { close, open }] = useDisclosure(false);
  const [opening, setOpened] = useState(false);
  const [opened, setOpen] = useState(false);

  const {data : businessData, error : businessError , isLoading: isLoadingBusiness} = useRestaurantBusinessEndpoint(props.id)

  //  if(businessError) {
  //   return <>error</>
  //  } else if (businessData) {
  //   return <>data</>
  //  } else {
  //   return <>isLoading</>
  //  } 
    if (businessError) {
        if (businessError.code == ("BUSINESS_NOT_FOUND")) {
          return (
            <div style={{ height: '450px', 
              width: '450px',
              alignItems: 'center' }} >
              <Text size="md" 
                color="dimmed" >
                  The business was not found
              </Text> 
            </div>
          )
        } else {
          return (
            <div style={{ height: '450px', 
              width: '450px', 
              alignItems: 'center' }} >
              <Text size="md" 
                color="dimmed">
                  There was an error in the API call
              </Text> 
            </div>
          ) 
        }
      } else if (isLoadingBusiness) {
        return (
          <div  style={{ height: '450px', 
            width: '450px'}} >
            <Card className='bg-gradient-to-r from-pink-100 via-white to-pink-100 ' 
              shadow="sm" 
                radius="md" 
                style={{ height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' }}>
              <Loader size={50} 
                color="#FF5858"/>
            </Card>
           </div>      
        );
      } else {
        const rating = businessData.rating
        var ratingExists = true
        if (rating == undefined) {
          ratingExists = false
        }
        const reviewNo = businessData.review_count
        var reviewExists = true
        if (reviewNo == undefined) {
          reviewExists = false
        }
        const nameRestaurant = businessData.name
        var imageUrl =  businessData.image_url
        if (imageUrl == undefined) {
          imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        }
        var photos = businessData.photos 
        var photosExists = true
        if (photos == undefined) {
          photosExists = false
          photos=[imageUrl]
        }
        const pricePoint = businessData.price
        var priceExists = true
        if (pricePoint == undefined) {
          priceExists = false
        }
        const url = businessData.url
        var urlExists = true
        if (url == undefined) {
          urlExists = false
        }
        const cuisines = businessData.categories
        var cuisineExists = true
        var cuisineLength = 0
        if (cuisines == undefined) {
          cuisineExists = false
          cuisineLength = 0
        } else {
          cuisineLength = cuisines.length
        }
        const cuisineList = new Array(cuisineLength) 
        for(var i = 0;i < cuisineLength;i++) {
          cuisineList[i] = cuisines[i].title;
        }
        if (businessData.hours == undefined) {
          businessData.hours = [
            {
              "open": [
                {
                  "is_overnight": false,
                  "start": "0600",
                  "end": "1600",
                  "day": 0
                },
                {
                  "is_overnight": false,
                  "start": "0600",
                  "end": "1600",
                  "day": 1
                },
                {
                  "is_overnight": false,
                  "start": "0600",
                  "end": "1600",
                  "day": 2
                },
                {
                  "is_overnight": false,
                  "start": "0600",
                  "end": "1600",
                  "day": 3
                },
                {
                  "is_overnight": false,
                  "start": "0600",
                  "end": "1600",
                  "day": 4
                },
                {
                  "is_overnight": false,
                  "start": "0700",
                  "end": "1600",
                  "day": 5
                },
                {
                  "is_overnight": false,
                  "start": "0700",
                  "end": "1600",
                  "day": 6
                }
              ],
              "hours_type": "REGULAR",
              "is_open_now": true
            }]
        }
        var openTimes =  businessData.hours[0].is_open_now
       
        
        var boolExists = true
        if (openTimes == undefined) {
          boolExists = false
        }
         
        const operationTimes = businessData.hours[0]
        var timeExists = true
        if (operationTimes == undefined) {
          timeExists = false
        }
       
        var data = JSON.stringify(operationTimes.open)
        const formattedHours = GetHours(data)
        const ths = (
          <tr style = {{borderBottomColor : 'pink'}}>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        );
        const rows = formattedHours.map((individual, index) => (
          <tr key={`row-${index}`}>
            <td>{individual.day}</td>
            <td>{individual.timing}</td>
          </tr>
        ));
        return (
          <div style={{ height: '450px',
            width: '450px'}}>
            <Card shadow="sm" 
            radius="lg" 
            style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage:`url(${imageUrl})`,
            opacity : 1,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
           // borderRadius: 'inherit',
           position : 'relative'
             }}>
        <Overlay
        gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`} zIndex={0} opacity = '0.5'
      />

      <div 
      style={{ position: 'absolute',
       top: 0,
         right: 0, 
         padding: '12px' }}>
          {priceExists && 
      <Badge  className="PriceStr" color='green'   variant="light" size = "lg">
              {pricePoint}
              </Badge>
    }
      </div>
      <div
        style={{
          position: 'absolute',
          
          top: '15%',
          left: 11,
          transform: 'translateY(-50%)'
        }}>
        <Text className="text-5xl p-4 font-bold from-pink-300 via-pink-50 to-pink-300 bg-gradient-to-r bg-clip-text text-transparent" style={{  borderColor : "purple", //borderSpacing : '10px', borderInlineColor : "purple", 
         fontSize: '24px',
          fontWeight: 700
 }}>{nameRestaurant}</Text>
      </div>
      <div
      
        style={{
          
          position: 'absolute',
          top: '25%',
          left: 11,
          transform: 'translateY(-50%)'
        }}>
          {cuisineExists && 
        <Text 
        //className='text-5xl p-4 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'
        className='p-4 text-pink-200' 
        style={{ 
        
      fontSize: '12px',
      fontWeight: 800 }}>
        {cuisineList.join(', ')}
        </Text>
        }
      </div>
    
      <Modal
          radius = "lg"
          centered
          withCloseButton={false} 
          size="auto"
          
        opened={opened}
        onClose={() => setOpen(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3} 
      overflow="inside" 
      style = {{ position : "absolute", top:'7%'
     
        } }
      >
      <RestImages photos = {photos}/>
      </Modal> 
      <Modal
          centered
          withCloseButton={false} 
          size="auto"
        opened={opening}
        onClose={() => setOpened(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside" 
      style = {{ position : "absolute"
     
        } }
      // style = {{height : "410px", position : "absolute",
      // transform: "translate(100%, 100%)",
      
      // width: "410px" }}

      
      >
         <Table  /*border-color='pink'*/ style = {{ color: "black" }} fontSize = "xs" horizontalSpacing={-10} verticalSpacing={-10} >
      
      <tbody /*style = {{borderColor : 'pink'}}*/>{rows}</tbody>
    </Table>
      </Modal>
      
      <div
      style = {{position:'absolute',
      top:'60%',
      left: 23,
      //transform : 'translateY(-50%)',
      }}>
        {boolExists  && 
         openTimes ? (
          // <div  style={{   display : 'flex'}}/*style={{position : 'relative'}}*/> 
          <Group position='left' spacing={-100} style={{display:'flex'}}>
            <IconCheck  color= "green" size = '30px' strokeWidth={3} />
        <Text  className='text-lime-500  font-bold ' style={{  fontSize: '18px',
      fontWeight: 800}}>
          Open
        </Text> 
        </Group>
        // </div>
        )
         : (
          <Group position='left' spacing={-100} style={{display:'flex'}}>
            <IconX  color= "red" size = '22.5px'  />
        <Text className='text-red-500 font-bold ' style={{fontSize: '18px',
        fontWeight: 800}}>
          Closed
        </Text>
        </Group>
        )
         }
      </div>
      
      <div
      style = {{position:'absolute',
      top:'61%',
      right: 23,
      //transform : 'translateY(-50%)',
      }}
      >
       {ratingExists && <Rating className="rating" value={rating} fractions = {2} readOnly size = "md"/>}
      </div>

      <div
        style={{
        
          position: 'absolute',
          top: '68%',
          left: 320,
        }}>
          
          {reviewExists && <Text className='text-pink-200' style= {{ color : 'white' , fontWeight : 800, fontSize : '10px'}}>{reviewNo} Reviews</Text>}
          </div> 
    
          <div
        style={{
        
          position: 'absolute',
          top: '73%',
          left: 304,
        }}>
          
          {photosExists &&  <Button style={{ color : 'white', fontWeight : 800, fontSize : '10px',backgroundColor: 'transparent'}} onClick={() => setOpen(true)}>Photos</Button>
}
          </div> 
      
      <div
        style={{
          zIndex : 2,
          position: 'absolute',
          top: '70%',
          left: 8,
          transform: 'translateY(-50%)',
          //height: '100%'
        }}>
          {timeExists && 
          <Button className='text-pink-200' style={{ color : 'white', fontWeight : 800, fontSize : '10px',backgroundColor: 'transparent'}} onClick={() => setOpened(true)}>Business Hours</Button>
         
          }
     
    </div>

      <div style={{ zIndex:1, transform: 'translateX(-50%)' , 
      position: 'absolute',
       bottom: 10,
       left : '50%',
        padding: '12px' }}>
        

          {urlExists &&
        <Button component = "a"  target = '_blank' color='pink' opacity={0.8} variant="light"  mt="md" radius="md" href = {url} size = "md" >
          Go to site
        </Button>
      }
      </div>
    </Card> 
</div>
        )}
}
