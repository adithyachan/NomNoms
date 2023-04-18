import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid, Title, Center, Button, Flex, Image, Text, SegmentedControl, Menu } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";
import NavBar from "@/components/NavBar";
import { NotificationsProvider, showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { getRestaurantList } from "@/lib/utils/yelpAPI";
import { IconAbc, IconChevronDown, IconChevronUp, IconCurrencyDollar, IconWorld, IconX } from "@tabler/icons-react";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useRouter } from "next/router";
import BestCard from "@/components/table/tableSelected/ShowingBestCard";
import { useUser } from "@/providers/AuthProvider";
import { useToggle } from "@mantine/hooks";
import { UpdateTable } from "@/lib/firebase/table/TableOperations";

const numFetch = 50;
const limit = 5;

export default function TableSelectedLayout(props: {table: Table}) {
  const [offset, setOffset] = useState(5)
  const [data, setData] = useState<any[]>([])
  const [preview, setPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [noRes, setNoRes] = useState(false)
  const [value, setValue] = useState('rated');
  const [sortDir, toggle] = useToggle()
  const [sortVar, setSortBy] = useState<string>()
  const [vote, setVote] = useState<boolean>()
  const [cuisine, setCuisine] = useState<string>()
  const [priceString, setPriceString] = useState<string>()
  const { user } = useUser()

  const router = useRouter()

  const HandleVoting = async () => {
    setVote(true)
    let tablePriceArray = props.table.prefs.price.split(",")
    let tableCuisineArray = props.table.prefs.cuisine.split(",")
    let myPriceArray = priceString?.split(',')
    let myCuisineArray = cuisine?.split(',')
    myPriceArray?.forEach(p => {
      if(!tablePriceArray.includes(p)) tablePriceArray.push(p)
    })
    myCuisineArray?.forEach(c => {
      if(!tableCuisineArray.includes(c)) tableCuisineArray.push(c)
    })
    props.table.prefs.price = tablePriceArray.join(",")
    props.table.prefs.cuisine = tableCuisineArray.join(",")
    if (!props.table.prefsDone.includes(user?.uid!))
      props.table.prefsDone.push(user?.uid!)
    await UpdateTable(props.table)
  }

  const HandleResults = () => {
    router.push(router.asPath + "/results")
  }

  const VoteButton = () => {
    const { user } = useUser()
    const uid = user?.uid
    // user has completed voting
    if (Object.keys(props.table.users).includes(uid!) && Object.keys(props.table.users[uid!]).length !== 0) {
      return (
        <>
          <Button fullWidth color="red" onClick={HandleResults}>
            Results
          </Button>
        </>
      )
    // user still needs to vote
    } else {
      return (
        <>
          <Button fullWidth color="red" onClick={HandleVoting} disabled={vote}>
            { vote ? `Waiting for others to finish preferences (${props.table.prefsDone.length}/${Object.keys(props.table.users).length})` : "Vote!" }
          </Button>
        </>
      )
    }
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

  const getRestaurantWithPrefs = (cuisine?: string[], price?: {min: string, max: string}) => {


    let temp = data
    // console.log("before filters: " + temp)
    // console.log(" TABLE: cuisine: " + cuisine)
    // console.log(" TABLE: min: " + price?.min)
    // console.log(" TABLE: max: " + price?.max)
    /*
    if (cuisine) {
      temp.forEach(item => 
        console.log(item.categories.map((i: any) => i.title))
      )
      temp = temp.filter(item => 
        item.categories.map((i: any) => i.title).includes(cuisine) 
      );
    }
    */

    if (cuisine) {
      if (cuisine.length != 0) {
        temp = temp.filter(item => {
          const categories = item.categories.map((i: any) => i.title);
          return cuisine.some(c => categories.includes(c));
        });
      }
      setCuisine(cuisine.join(','))
    }

    console.log("CUISINE: " + cuisine)

    console.log("TEMP: " + temp)

    if (price) {
      let p = ""
      for (let i = price.min.length; i < price.max.length; i++) {
        p += i + " ,"
      }
      p = p.substring(0, p.length - 2)
      setPriceString(p)
      temp = temp.filter((item) => {
        const itemPrice = item.price ? item.price.length : 4
        const min = price.min.length
        const max = price.max.length
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

  const sortBy = (by: string, dir: boolean) => {
    const comp = (a: any, b: any) => {
      if ((!a[by] && !b[by]) || a[by] == b[by])
        return 0
      if (!a[by]) 
        return dir ? 1 : -1
      if (!b[by])
        return dir ? -1 : 1

      if (a[by] > b[by])
        return dir ? 1 : -1
      else if (a[by] < b[by])
        return dir ? -1 : 1
      else
        return 0
    }
    const sorted = [...preview].sort(comp)
    setPreview(sorted)
  }

  useEffect(() => {
    if (data.length == 0) {
      getRestaurantFirstTime()
    }
    if (props.table.prefsDone.length == Object.keys(props.table.users).length) {
      router.push(router.asPath + "/voting")
    }
  }, [props.table])
  
  function addOrdinalSuffix(dateString: string) {
    const dateParts = dateString.split(" ");
    const day = parseInt(dateParts[0]);
    const month = dateParts[1];
    const year = parseInt(dateParts[2]);
    
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }
    
    return day + suffix + " " + month + " " + year;
  }
  
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Title className="mb-1 mt-4 ml-2 text-center text-xl font-black" variant="gradient" gradient={{ from: "red.7", to: "red.4" }} order={2}>
  {"Event Date: "}
</Title>
<Title className="mb-3 ml-2 text-center text-xl font-black" variant="gradient" gradient={{ from: "red.7", to: "red.4" }} order={2}>
  {"Event Description: " + props.table.description}
</Title>

</div>

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

                      <Image width={400} src="/images/unfound.png" />
                    </Flex>
                  </>
                :
                <>        
                  <RestaurantListLayout data={preview.slice(0, offset)} />
                  {offset < preview.length ? 
                    <Flex direction="column" align="center" gap="sm">
                      <Flex gap="10px" direction="row" align="between" justify="space-around" className="w-full mt-3">
                        <Button.Group>
                          <Menu>
                            <Menu.Target>
                              <Button color="gray">
                                {sortVar ?? "Sort By"}
                              </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item 
                                onClick={() => {
                                  sortBy("price", sortDir)
                                  setSortBy("price")
                                }} 
                                rightSection={<IconCurrencyDollar className="ml-5 h-5 w-5"/>}
                              >
                                Price
                              </Menu.Item>
                              <Menu.Item 
                                onClick={() => {
                                  sortBy("name", sortDir)
                                  setSortBy("name")
                                }}
                                rightSection={<IconAbc className="ml-5 h-5 w-5"/>}
                              >
                                Name
                              </Menu.Item>
                              <Menu.Item 
                                onClick={() => {
                                  sortBy("distance", sortDir)
                                  setSortBy("distance")
                                }} 
                                rightSection={<IconWorld className="ml-5 h-5 w-5"/>}
                              >
                                Distance
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                          <Button color="gray" onClick={() => {
                            toggle()
                            sortBy(sortVar ?? "price", !sortDir)
                          }}>
                            {sortDir ? <IconChevronDown /> : <IconChevronUp />}
                          </Button>
                        </Button.Group>
                        
                        <VoteButton/>
                        <Button color="red" onClick={() => {
                          setOffset(offset + limit > preview.length ? preview.length : offset + limit)
                        }}>
                          Load More
                        </Button>
                      </Flex>
                    </Flex>
                  : null}
                </>}
              </>}
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