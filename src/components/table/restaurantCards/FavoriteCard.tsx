import { Card,  Text, Badge, Button, Group, Popover, Overlay,useMantineTheme, Modal ,Rating } from '@mantine/core';

export default function FavoriteCard({id, setFavorite, favorite, listData}: any) {
  const theme = useMantineTheme();

  const businessData = listData.find((business: any) => business.id === id)

    if (businessData){
        
        const nameRestaurant = businessData.name
        var imageUrl =  businessData.image_url
        if (imageUrl == undefined) {
          imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        }
        
        const pricePoint = businessData.price
        var priceExists = true
        if (pricePoint == undefined) {
          priceExists = false
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
        
        for(var i = 0;i < cuisines.length;i++) {
          cuisineList[i] = cuisines[i].title;
        }
        
        const cardStyle = id === favorite ? {
          height: '450px',
          width: '450px',
          border: '8px solid gold',
          borderRadius: '8px'
        } : {
          height: '450px',
          width: '450px'
        };
        return (
          <div style={cardStyle} key={id}>
            <Card shadow="sm" 
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
      <Badge  color='green'   variant="light" size = "lg">
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
        className='p-4 text-pink-200' 
        style={{ 
        
      fontSize: '12px',
      fontWeight: 800 }}>
        {cuisineList.join(', ')}
        </Text>
        }
      </div>

      <div style={{ zIndex:1, transform: 'translateX(-50%)' , 
      position: 'absolute',
       bottom: 10,
       left : '50%',
        padding: '12px' }}>
        

          {
        <Button onClick={() => setFavorite(id)} component = "a"  target = '_blank' color='pink' opacity={0.8} variant="light"  mt="md" radius="md"  size = "md" >
          Favorite!
        </Button>
      }
      </div>
    </Card> 
</div>
        )} else {
          return <>Somehow we lost the list data...</>
        }
}