import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid, Title, Center, Button } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";
import NavBar from "@/components/NavBar";
import { NotificationsProvider, showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { getRestaurantList } from "@/lib/utils/yelpAPI";
import { IconX } from "@tabler/icons-react";
import LoadingLayout from "@/layouts/LoadingLayout";

const limit = 5;
const numFetch = 50;
const radius = 10000;
const food =  "food"
const priceMap = {
  "$": 1,
  "$$": 2,
  "$$$": 3,
  "$$$$": 4
}

export default function TableSelectedLayout(props: {table: Table}) {
  const [offset, setOffset] = useState(limit)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getRestaurantWithPrefs = async (cuisine?: string, price?: {min: string, max: string}) => {
    let p : string | undefined = undefined
    if (price) {
      p = ""
      for (let i = priceMap[price.min as keyof typeof priceMap]; 
        i <= priceMap[price.max as keyof typeof priceMap]; i++) {
          p += `${i}, `
      }
      p.substring(0, p.length - 2)
    }

    setError(false)
    setLoading(true)

    try {
      const res = await getRestaurantList(
        numFetch, 
        props.table.prefs.zip,
        radius, 
        cuisine !== food ? cuisine + "," + food : food, 
        p
      );
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
        console.log(resJSON.businesses)
        setData(resJSON.businesses)
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
    setOffset(limit);
    setLoading(false);
  }

  useEffect(() => {
    if (data.length == 0) {
      getRestaurantWithPrefs(food)
    }
  }, [])

  return (
    <>
    <NotificationsProvider>
      <NavBar>
      </NavBar>
      <Container fluid className="p-10 bg-gradient-to-b from-rose-100 to-white">
        {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
        <Grid>
          <Grid.Col span="auto">
            <TablePrefSidebar data={data} setPrefs={getRestaurantWithPrefs}/>
          </Grid.Col>
          <Grid.Col span={5}>
            {loading ? <LoadingLayout /> : 
            <>
              <Title className="text-center" order={2}>{"Table Name: " + props.table.name.toUpperCase()}</Title> 
              <RestaurantListLayout data={data.slice(0, offset)} />
              <Center className="mt-5">
                <Button color="red" onClick={() => {
                  setOffset(offset + limit > data.length ? data.length : offset + limit)
                }}>
                  Load More
                </Button>
              </Center>
            </>}
          </Grid.Col>
          <Grid.Col span="auto">
            <TableUserSidebar table={props.table} />
          </Grid.Col>
        </Grid>
      </Container>
    </NotificationsProvider>
    </>
  );
}