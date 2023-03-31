// Next Imports
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Container, Title, Center, Button, Flex, Tooltip, TextInput, Text, Image} from "@mantine/core";
import TablePrefSidebarIndiv from "@/components/table/tableSelected/TablePrefSidebarIndiv";
import { Grid } from "@mantine/core";
import RestaurantListIndividualLayout from "@/layouts/table/tableSelected/RestaurantListIndividualLayout";
import { useState } from "react";
import { getRestaurantList } from "@/lib/utils/yelpAPI";
import { showNotification, NotificationsProvider } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import LoadingLayout from "@/layouts/LoadingLayout";

const limit = 5;

const priceMap = {
  "$": 1,
  "$$": 2,
  "$$$": 3,
  "$$$$": 4
}


export default function TablePage(props: any) {
  const router = useRouter()
  const [offset, setOffset] = useState(5)
  const [data, setData] = useState<any[]>([])
  const [preview, setPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [zipCheck, setZipCheck] = useState("")
  const [noRes, setNoRes] = useState(false)


  const getRestaurantFirstTime = async (zip : string) => {
    setError(false)
    setLoading(true)
    /*parseInt(props.table.prefs.zip)*/
    try {
      const res = await getRestaurantList(50, zip, 10000, "food")
      const resJSON = await res.json()
      console.log(resJSON)
      if (res.status >= 400) {
        showNotification({
          title: "Yikes",
          message: resJSON.error,
          icon: <IconX />,
          color: "red"
        })
        setError(true)
        console.log(resJSON)
      }
      else if(res.ok) {
        setData(resJSON.businesses)
        setPreview(resJSON.businesses)
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

  const getRestaurantWithPrefs = (zip?: string, cuisine?: string, price?: {min: string, max: string}) => {
    if (zipCheck != zip! || data.length == 0) {
      setZipCheck(zip!)
      getRestaurantFirstTime(zip!)
    } else{
      let temp = data
      if (cuisine) {
        temp = temp.filter((item) => {
          if (Array.isArray(item.categories)) {
            // Use Array.some() instead of findIndex()
            return item.categories.some((i: any) => {
              // Return true if title matches cuisine
              return i.title === cuisine;
            });
          } else {
            return item.categories.title === cuisine;
          }
        });
      }
      if (price) {
        temp = temp.filter((item) => {
          const itemPrice = priceMap[item.price as "$" | "$$" | "$$$" | "$$$$"]
          const min = priceMap[price.min as "$" | "$$" | "$$$" | "$$$$"]
          const max = priceMap[price.max as "$" | "$$" | "$$$" | "$$$$"]
          return itemPrice >= min && itemPrice <= max
        })
      }
      if (temp.length != 0) {
        setPreview(temp)
        setOffset(temp.length > limit ? limit : temp.length)
        setNoRes(false)
      } else if (price?.min == "" || price?.max == "") {
        setNoRes(true)
      }

    } 
  }

  return (
  /*   
    <>
    <NavBar>
    </NavBar>
    <Container fluid className="p-10 bg-gradient-to-b from-rose-100 to-white">
 
      <Grid>
        <Grid.Col span="auto">
          <Flex 
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
          >
            <TablePrefSidebarIndiv data={data} setPrefs={getRestaurantWithPrefs} />

          </Flex>
        </Grid.Col>
        <Grid.Col span={5}>
        {loading ? <LoadingLayout /> : 
            <>
              <Title className="text-center" order={2}>{"Table Name: Personal Tables"}</Title> 
              <RestaurantListIndividualLayout data={preview.slice(0, offset)} />
              <Center className="mt-5">
                <Button color="red" onClick={() => {
                  setOffset(offset + limit)
                }}>
                  Load More
                </Button>
              </Center>
            </>}
        </Grid.Col>
      </Grid>
    </Container>
    </>
  */
    <>
    <NotificationsProvider>
      <NavBar>
      </NavBar>
      
      <Container fluid className="p-3 bg-gradient-to-b from-rose-100 to-white">
        
        {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
        <Title className="mb-3 text-center text-4xl font-black " variant="gradient" gradient={{from: "red.7", to: "red.4"}} order={2}>{"A Table for One"}</Title> 
        <Grid>
          <Grid.Col span={5}>
            <TablePrefSidebarIndiv data={data} setPrefs={getRestaurantWithPrefs}/>
          </Grid.Col>
          <Grid.Col span="auto">
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
              <RestaurantListIndividualLayout data={preview.slice(0, offset)} />
              <Center className="mt-5">
                {offset < preview.length ? 
                <Flex direction="column" align="center" gap="sm">
                  <Button fullWidth color="red" onClick={() => {
                    setOffset(offset + limit > preview.length ? preview.length : offset + limit)
                  }}>
                    Load More
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
        </Grid>
      </Container>
    </NotificationsProvider>
    </>
  )
}