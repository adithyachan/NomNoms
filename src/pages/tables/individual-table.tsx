// Next Imports
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Container, Title, Center, Button, Flex, Tooltip, TextInput} from "@mantine/core";
import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import { Grid } from "@mantine/core";
import RestaurantListIndividualLayout from "@/layouts/table/tableSelected/RestaurantListIndividualLayout";
import { useState, useEffect } from "react";
import { getRestaurantList } from "@/lib/utils/yelpAPI";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useDisclosure, useInputState } from "@mantine/hooks";

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
  const [zip, setZip] = useInputState('');
  const [openedZip, inputHandlersZip] = useDisclosure();
  const zip_check = zip.length == 5 && !Number.isNaN(zip)

  const getRestaurantFirstTime = async () => {
    setError(false)
    setLoading(true)
    /*parseInt(props.table.prefs.zip)*/
    try {
      const res = await getRestaurantList(50, "08540", 10000, "food")
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

  const getRestaurantWithPrefs = (cuisine?: string, price?: {min: string, max: string}) => {
    if (zip_check && data.length == 0) {
      getRestaurantFirstTime()
    } else{
      let temp = data
      if (cuisine) {
        /*
        temp = temp.filter((item) => 
        (item.categories as any[]) ? 
        item.categories.findIndex((i: any) => {
          i.title == cuisine
        }) != -1
        : item.categories.title == cuisine
        )
        */
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
      setPreview(temp)      
    } 
  }

  return (
    <>
    <>
      <NavBar>
      </NavBar>
    <Container fluid className="p-10 bg-gradient-to-b from-rose-100 to-white">
      {/* Create Grid with 3 columns, 1st & 3rd are smaller. Middle is larger */}
      <Grid>
        <Grid.Col span="auto">
          <Flex 
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
          >
              {error ? <small className="text-red-500">error</small> : null}
            <Tooltip
            label={zip_check ? null : "Invalid Zip Code"}
            position="left"
            withArrow
            opened={openedZip && !zip_check}
            color={"red.8"}
              >
              <TextInput
                placeholder="Zip Code"
                onFocus={() => inputHandlersZip.open()}
                onBlur={() => inputHandlersZip.close()}
                mt="md"
                value={zip}
                onChange={setZip}
              />
            </Tooltip>
            <TablePrefSidebar data={data} setPrefs={getRestaurantWithPrefs} />

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

    </>
  )
}