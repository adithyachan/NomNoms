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

const limit = 5;

export default function TableSelectedLayout(props: {table: Table}) {
  const [offset, setOffset] = useState(5)
  const [data, setData] = useState<any[]>([])
  const [preview, setPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const getRestaurantFirstTime = async () => {
    setError(false)
    setLoading(true)

    try {
      const res = await getRestaurantList(50, parseInt(props.table.prefs.zip), 10000, "food")
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
        setData(resJSON.businesses)
        getSlice(resJSON.businesses, offset)
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

  const getRestaurantWithPrefs = (cuisine?: string, price?: {min: string, max: string}) => {
    let temp = data
  }
  
  const getSlice = (data: any[], offset: number) => {
    setPreview(data.slice(0, offset))
  }

  useEffect(() => {
    if (!data) {
      getRestaurantFirstTime()
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
            <TablePrefSidebar data={data} setPrefs={getRestaurantWithPrefs} table={props.table} />
          </Grid.Col>
          <Grid.Col span={5}>
            <Title className="text-center" order={2}>{"Table Name: " + props.table.name.toUpperCase()}</Title> 
            <RestaurantListLayout data={preview} />
            <Center className="mt-5">
              <Button color="red" onClick={() => {
                setOffset(offset + limit)
              }}>
                Load More
              </Button>
            </Center>
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