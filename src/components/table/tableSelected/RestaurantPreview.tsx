import LoadingLayout from "@/layouts/LoadingLayout"
import { useEffect, useState } from "react"
import { Table } from "@/types/Table";
import { Container, Title, Button, Center } from "@mantine/core";
import { getRestaurantList } from "@/lib/utils/yelpAPI";
import RestaurantPreviewCard from "./RestaurantPreviewCard";
import { NotificationsProvider, showNotification, NotificationProps } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export default function RestaurantPreview(props: { table: Table }) {
  const [limit, setLimit] = useState(5)
  const [offset, setOffset] = useState(0)
  const [restaurantCards, setRestaurantCards] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const getRestaurants = async () => {
    setError(false)
    setLoading(true)

    try {
      const res = await getRestaurantList(limit, parseInt(props.table.prefs.zip), 10000, props.table.prefs.cuisine.toLowerCase() + ",food", offset)
      const resJSON = await res.json()
      if (res.status >= 400) {
        showNotification({
          title: "Yikes",
          message: resJSON.error,
          icon: <IconX />,
          color: "red"
        })
        setError(true)
      }
      else if(res.ok) {
        console.log(resJSON)
        setRestaurantCards([...restaurantCards,
          resJSON.businesses.map((bus: any) => 
            <RestaurantPreviewCard key={bus.id} data={bus}/>
          )
        ])
      }
    }
    catch (err) {
      showNotification({
        title: "Yikes",
        message: "Failed to fetch data",
        icon: <IconX />,
        color: "red"
      })
      setError(true)
      console.log(err)
    }
    setLoading(false);
  }

  useEffect(() => {
    getRestaurants()
  }, [offset])
  
  if (loading) {
    return <LoadingLayout />
  }

  if (error) {
    return <></>
  }

  return (
    <>
      <NotificationsProvider />
      <Title className="text-center" order={2}>{"Table Name: " + props.table.name.toUpperCase()}</Title>
      <Container mah={550} className="overflow-y-scroll space-y-3">
        { restaurantCards ?? null }
      </Container>
      <Center className="mt-5">
        <Button color="red" onClick={() => {
          setOffset(offset + 5)
        }}>Load More</Button>
      </Center>
    </>
    
  )
}