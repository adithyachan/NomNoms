import TablePrefSidebar from "@/components/table/tableSelected/TablePrefSidebar";
import TableUserSidebar from "@/components/table/tableSelected/TableUserSidebar";
import { Table } from "@/types/Table";
import { Container, Grid, Title, Center, Button, Flex, Image, Text, SegmentedControl, Menu } from "@mantine/core";
import RestaurantListLayout from "./RestaurantListLayout";
import NavBar from "@/components/NavBar";
import { NotificationsProvider } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { IconAbc, IconChevronDown, IconChevronUp, IconCurrencyDollar, IconRefresh, IconWorld, IconX, IconZoomReset } from "@tabler/icons-react";
import LoadingLayout from "@/layouts/LoadingLayout";
import { useRouter } from "next/router";
import BestCard from "@/components/table/tableSelected/ShowingBestCard";
import { useUser } from "@/providers/AuthProvider";
import { useToggle } from "@mantine/hooks";
import { UpdateTable } from "@/lib/firebase/table/TableOperations";

const limit = 5;

export default function TableSelectedLayout(props: {table: Table}) {
  const [offset, setOffset] = useState(5)
  const data = props.table.restaurantList
  const [preview, setPreview] = useState<any[]>(props.table.restaurantList)
  const [loading, setLoading] = useState(false)
  const [sorted, setSorted] = useState<any[]>()
  const [error, setError] = useState(false)
  const [noRes, setNoRes] = useState(false)
  const [value, setValue] = useState('rated');
  const [sortDir, toggle] = useToggle()
  const [sortVar, setSortBy] = useState<string>()
  const [vote, setVote] = useState<boolean>()
  const [cuisine, setCuisine] = useState<string>()
  const [priceString, setPriceString] = useState<string>("1,2,3,4")
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

  const getRestaurantWithPrefs = (cuisine?: string[], price?: {min: string, max: string}) => {

    let temp = data

    if (cuisine) {
      if (cuisine.length != 0) {
        temp = temp.filter(item => {
          const categories = item.categories.map((i: any) => i.title);
          return cuisine.some(c => categories.includes(c));
        });
      }
      setCuisine(cuisine.join(','))
    }

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
    setSorted(sorted)
  }

  useEffect(() => {
    if (data.length == 0) {
      setLoading(true)
    }
    else {
      setLoading(false)
    }

    if (user && props.table.banned.includes(user.uid)) {
      router.push("/tables/tablenotfound")
    }

    if (props.table.prefsDone.length == Object.keys(props.table.users).length &&
        !(Object.keys(props.table.users).includes(user.uid!) && 
        Object.keys(props.table.users[user.uid!]).length !== 0)) {
        router.push(router.asPath + "/voting")
    }
  }, [props.table])
  
  function addOrdinalSuffix(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                   (day % 10 === 2 && day !== 12) ? "nd" :
                   (day % 10 === 3 && day !== 13) ? "rd" :
                   "th";
    return `${day}${suffix} ${date.toLocaleString('en-US', {month: 'long', year: 'numeric'})}`;
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
  {"Event Date: " + new Date(props.table.date.seconds * 1000).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })

}
</Title>
{props.table.description && 
<Title className="mb-3 ml-2 text-center text-xl font-black" variant="gradient" gradient={{ from: "red.7", to: "red.4" }} order={2}>
  {"Event Description: " + props.table.description}
</Title>
}

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
                  <RestaurantListLayout data={(sorted ?? preview).slice(0, offset)} />
                  
                    <Flex direction="column" align="center" gap="sm">
                      <Flex gap="10px" direction="row" align="between" justify="space-around" className="w-full mt-3">
                        <Button.Group>
                          <Menu>
                            <Menu.Target>
                              <Button color="gray" className="sort-button">
                                {sortVar ? sortVar?.substring(0, 1).toUpperCase()! + sortVar?.substring(1) : "Sort By"}
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
                              <Menu.Item 
                                onClick={() => {
                                  setSorted(undefined)
                                  setSortBy("")
                                }} 
                                rightSection={<IconRefresh className="ml-5 h-5 w-5"/>}
                              >
                                Reset
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
                        {offset < preview.length ? 
                        <Button color="red" onClick={() => {
                          setOffset(offset + limit > preview.length ? preview.length : offset + limit)
                        }}>
                          Load More
                        </Button> : 
                        <Button disabled>Load More</Button>}
                      </Flex>
                    </Flex>
                  
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