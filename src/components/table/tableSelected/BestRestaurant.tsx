import { BackgroundImage, Button, Container, Rating, Title } from "@mantine/core";
import RestaurantPreviewCard from "./RestaurantPreviewCard";

export default function RestaurantBest(props : {parameter : string, listDataReview : any,listDataRated : any}) {
   
        return (
            <Container>
                <div className="shadow-lg shadow-rose 200 rounded-2xl transition ease-in-out hover:shadow-xl hover:shadow-rose-300 duration-300 delay-75">
      <BackgroundImage src={props.listDataReview.image_url} className="w-full h-32 rounded-2xl">
        <div className="h-full w-full bg-gray-800/60 rounded-2xl flex justify-end items-center">
          <div className="w-full ml-5 mt-3">
            <Title color="white" order={3}>{props.listDataReview.name.length > 15 ? props.listDataReview.name + "..." : props.listDataReview.name} <span className="text-red-500">({props.listDataReview.price ?? "?"})</span></Title>
            <small className="text-white -mt-1">{props.listDataReview.location ? props.listDataReview.location.address1 : null}</small>
            <Rating defaultValue={props.listDataReview.rating} fractions = {2} readOnly size = "md" className="mt-2"/>
            <small className="text-white">{props.listDataReview.review_count} Reviews</small>
          </div>
          <Button component="a" radius="lg" color="red" className="mr-5" target="_blank" href={props.listDataReview.url}>
            Learn More
          </Button>
        </div>
      </BackgroundImage>
    </div>
        </Container>
        )
    
    
    

}
