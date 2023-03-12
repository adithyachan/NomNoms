import ShowCard from "@/components/table/restaurantCards/Card"
import CardStack from "@/components/table/restaurantCards/CardStack"
import RestImages from "@/components/table/restaurantCards/Photos"
export default function Test() {

  
    return (
      <>
       {/* <ShowCard id = 'pcb8yK9_28uWz5CyokjwSg'/> */}
       {/* <ShowCard id = 'jjDsVuD7KbxnYV4jFnyftA'/>  */}
       {/* <CardStack ids ={['pcb8yK9_28uWz5CyokjwSg', 'jjDsVuD7KbxnYV4jFnyftA']} /> */}
       <RestImages photos = {["https://s3-media2.fl.yelpcdn.com/bphoto/jvUKeXckaOTjBscELCYtgQ/o.jpg",
    "https://s3-media3.fl.yelpcdn.com/bphoto/WKIkS9LC1DxmLrasit7xCw/o.jpg",
    "https://s3-media2.fl.yelpcdn.com/bphoto/duBKI4mYPF4FGervuNP71w/o.jpg"]} />
      </>
    )
  }