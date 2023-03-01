import { Card, Image, Text, Badge, Button, Group, Popover, Overlay,useMantineTheme, Modal  } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
import { Loader } from '@mantine/core';
import { BackgroundImage, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GetHours from './HoursOfOperation';
import { Table } from '@mantine/core';
import { useState } from 'react';


//import RenderImage from './Image';
export default function ShowCard(props : {id : string }) {
  const theme = useMantineTheme();
  //const [opened, { close, open }] = useDisclosure(false);
  const [opening, setOpened] = useState(false);

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
        <div style={{ height: '410px', width: '410px'}} >
      <Card shadow="sm" radius="md" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader size={50} color="#FF5858"/>
      </Card>
    </div>      
      );
    } else {
         const nameRestaurant = businessData.name
         const imageUrl = businessData.image_url
         const photos = businessData.photos
         const pricePoint = businessData.price
         const url = businessData.url
         const cuisines = businessData.categories
         const cuisineList = new Array(cuisines.length)
         const operationTimes = businessData.hours[0]
         for(var i = 0;i < cuisines.length;i++) {
          cuisineList[i] = cuisines[i].title;
         }
         var data = JSON.stringify(operationTimes.open)
         const formattedHours = GetHours(data)
         const ths = (
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        );
        const rows = formattedHours.map((individual) => (
          <tr key={individual.name}>
            <td>{individual.day}</td>
            <td>{individual.timing}</td>
          </tr>
        ));
  return (
    <div style={{ height: '410px', width: '410px' }}>
      <Card shadow="sm" radius="md" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage:`url(${imageUrl})`,
            opacity : 1,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: 'inherit',
           position : 'relative'
             }}>
        <Overlay
        gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`} zIndex={0} opacity = '0.5'
      />

      <div style={{ position: 'absolute',
       top: 0,
         right: 0, 
         padding: '12px' }}>
      <Badge color="pink" variant="light" size = "md">
              {pricePoint}
              </Badge>
      </div>
      <div
        style={{
          position: 'absolute',
          
          top: '10%',
          left: 11,
          transform: 'translateY(-50%)'
        }}>
        <Text className="css-1se8maq" style={{ color:"pink", borderColor : "purple", //borderSpacing : '10px', borderInlineColor : "purple", 
         fontSize: '24px',
          fontWeight: 700
 }}>{nameRestaurant}</Text>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: 11,
          transform: 'translateY(-50%)'
        }}>
        <Text className="css-1se8maq" style={{ 
     color:"white", fontSize: '12px',
      fontWeight: 600 }}>
        {cuisineList.join(', ')}
        </Text>
      </div>
     
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
         <Table   style = {{backgroundColor : "transparent", color: "black" }} fontSize = "xs" horizontalSpacing={-10} verticalSpacing={-10} >
      
      <tbody>{rows}</tbody>
    </Table>
      </Modal>
      
    
    
      <div
        style={{
          zIndex : 2,
          position: 'absolute',
          top: '70%',
          left: -7,
          transform: 'translateY(-50%)',
          //height: '100%'
        }}>
          <Button style={{ backgroundColor: 'transparent'}} onClick={() => setOpened(true)}>Hours of Operation</Button>
         
           
      {/* <Popover   width={220} position="right" withArrow opened={opened} >
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close} style={{color: "white" , backgroundColor: 'transparent', borderColor: 'transparent' }}>
        Hours of Operation
        </Button>
      </Popover.Target>
      <Popover.Dropdown style = {{  backgroundColor : "transparent" }} sx={{ pointerEvents: 'none' }}>
        <Table   style = {{backgroundColor : "transparent", color: "white" }} fontSize = "xs" horizontalSpacing={-10} verticalSpacing={-10} >
      
          <tbody>{rows}</tbody>
        </Table>
      </Popover.Dropdown>
    </Popover> */}
    </div>

      <div style={{ zIndex:1, transform: 'translateX(-50%)' , 
      position: 'absolute',
       bottom: 0,
       left : '50%',
        padding: '12px' }}>
        <Button component = "a" variant="light" color="pink"  mt="md" radius="md" href = {url} size = "md" >
          Go to site
        </Button>
      </div>
    </Card> 
</div>
);    
}
}
