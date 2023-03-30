import { Container } from "@mantine/core";
import RestaurantPreviewCard from "./RestaurantPreviewCard";

export default function RestaurantPreview(props: { data: any[] }) {

  return (
    <>
      <Container mah={550} className="overflow-y-scroll space-y-3">
        { props.data.map((bus) => <RestaurantPreviewCard key={bus.id} data={bus} />)  }
      </Container>
    </>
    
  )
}