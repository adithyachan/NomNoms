import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid, Title, Center, Button, Flex, Image, Text, SegmentedControl } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";
import NavBar from "@/components/NavBar";
import { NotificationsProvider, showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { getRestaurantList } from "@/lib/utils/yelpAPI";
import { IconX } from "@tabler/icons-react";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useRouter } from "next/router";
import BestCard from "@/components/table/tableSelected/ShowingBestCard";

const numFetch = 50;
const limit = 5;
const priceMap = {
  "$": 1,
  "$$": 2,
  "$$$": 3,
  "$$$$": 4
}

export default function TableSelectedLayout(props: {table: Table}) {
  const [offset, setOffset] = useState(5)
  const [data, setData] = useState<any[]>([])
  const [preview, setPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [noRes, setNoRes] = useState(false)
  const [value, setValue] = useState('rated');

  const router = useRouter()
  const HandleVoting = () => {
    router.push(router.asPath + "/voting")
  }
  
  let temp: any[] = []
  const getRestaurantFirstTime = async (n: number = 5) => {
    setError(false)
    setLoading(true)

    for (let i = 0; i < n; i++) {
      try {
        const res = await getRestaurantList(numFetch, props.table.prefs.zip, 10000, "food", i * numFetch)
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
          temp = temp.concat(resJSON.businesses)
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
    }

    console.log(temp)

    setData(temp)
    setPreview(temp)
    setLoading(false);
  }

  const getRestaurantWithPrefs = (cuisine?: string, price?: {min: string, max: string}) => {


    let temp = data
    // console.log("before filters: " + temp)
    // console.log(" TABLE: cuisine: " + cuisine)
    // console.log(" TABLE: min: " + price?.min)
    // console.log(" TABLE: max: " + price?.max)
    if (cuisine) {
      temp.forEach(item => 
        console.log(item.categories.map((i: any) => i.title))
      )
      temp = temp.filter(item => 
        item.categories.map((i: any) => i.title).includes(cuisine) 
      );
    }

    if (price) {
      temp = temp.filter((item) => {
        const itemPrice = priceMap[item.price as "$" | "$$" | "$$$" | "$$$$"]
        const min = priceMap[price.min as "$" | "$$" | "$$$" | "$$$$"]
        const max = priceMap[price.max as "$" | "$$" | "$$$" | "$$$$"]
        return itemPrice >= min && itemPrice <= max
      })
    }

    // console.log(temp)
    if (temp.length != 0) {
      setPreview(temp)
      setOffset(temp.length > limit ? limit : temp.length)
      setNoRes(false)
    } else if (price?.min == "" || price?.max == "") {
      setNoRes(true)
    }
  }
  useEffect(() => {
    if (data.length == 0) {
      getRestaurantFirstTime()
    }
  }, [])
  return (
    <>
    <NotificationsProvider>
      <NavBar>
      </NavBar>
      
      <Container fluid className="p-3 bg-gradient-to-b from-rose-100 to-white">
        
        {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
        <Title className="mb-3 text-center text-3xl font-black " variant="gradient" gradient={{from: "red.7", to: "red.4"}} order={2}>{"Table Name: " + props.table.name.toUpperCase()}</Title> 
        <Grid>
          <Grid.Col span="auto">
            <TablePrefSidebar data={data} setPrefs={getRestaurantWithPrefs}/>
          </Grid.Col>
          <Grid.Col span={5}>
            {loading ? <LoadingLayout /> : 
              <>
              {noRes ? 
              <>
              <Flex
                    gap="sm"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
              >
              <Text className="text-xl font-bold text-red-500" ta="center" mt={100}>
                  No Restaurants Found.
              </Text>

              <Image  
              width={400} src="/images/unfound.png">
              </Image>
              </Flex>
              </>
              :

              <>          
              <RestaurantListLayout data={preview.slice(0, offset)} />
              <Center className="mt-5">
                {offset < preview.length ? 
                <Flex direction="column" align="center" gap="sm">
                  <Button fullWidth color="red" onClick={() => {
                    setOffset(offset + limit > preview.length ? preview.length : offset + limit)
                  }}>
                    Load More
                  </Button> 
                  <Button fullWidth color="red"
                    onClick={HandleVoting}
                  >
                  Vote!
                  </Button>
                  </Flex>
                : 
                null
                }
              </Center>
              </>

              }
            </>
            }
          </Grid.Col>
          <Grid.Col span="auto">
            <TableUserSidebar table={props.table} />
            { loading ? <></>  :<> {!noRes &&
            <Center className="mt-5">
            <Flex direction="column" align="center" gap="17.5px">
            <SegmentedControl transitionDuration={500} transitionTimingFunction="linear" radius = 'lg' color = "red"  style = {{backgroundColor:"white"}}  value={value} onChange={setValue}
              data={[
                { label: 'Best Rated', value: 'rated' },
                { label: 'Most Reviewed', value: 'review' },
              ]} 
            />
            <BestCard preview = {preview} value={value}  />
            </Flex>
            </Center>
            } 
            </>
          }
          
          </Grid.Col>
        </Grid>
      </Container>
    </NotificationsProvider>
    </>
  );
}