import { useRouter } from "next/router";
import { ReadTable, UpdateTable } from "@/lib/firebase/table/TableOperations";
import { Table } from "@/types/Table";
import { useState, useEffect } from "react";
import ShowCard from "@/components/table/restaurantCards/Card";
import { Text, Center, Container, Flex, Title, Grid } from "@mantine/core";
import { Button, Image } from "@mantine/core";
import RestaurantPreviewCard from "@/components/table/tableSelected/RestaurantPreviewCard";
import { IconDoorExit } from "@tabler/icons-react";
import { useUser } from "@/providers/AuthProvider";
export default function ResultsPage() {
  const router = useRouter()
  const { tableid } = router.query
  const[table, setTable] = useState<Table>()
  const { user } = useUser()
  
  const images = [
    '/images/burger.png',
    '/images/taco.png',
    '/images/sushi.png',
    '/images/boba.png',
    '/images/fries.png',
    '/images/cake.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the image every 2 seconds

    return () => clearInterval(interval);
  }, []);
  const fadeIn = {
    animationName: 'fadeIn',
    animationDuration: '1s',
  };

  const fadeOut = {
    animationName: 'fadeOut',
    animationDuration: '1s',
  };

  const HandleDone = () => {
    router.push(`/tables/`)
  }


  useEffect(() => {
    if (tableid !== undefined) {
      const unsub = ReadTable(tableid as string, setTable)
      return unsub
    }
  }, [tableid])

  if (table !== undefined) {
    // if (table.numDoneVoting >= Object.keys(table.users).length) {
    if (table.usersDoneVoting.length >= Object.keys(table.users).length) {
      // show results
      let totalVotes: { [key: string]: number } = {}

      for (const user of Object.values(table.users)) {
        for (const [restaurantID, value] of Object.entries(user)) {
          totalVotes[restaurantID] = (totalVotes[restaurantID] || 0) + value
        }
      }

      // const topRestaurantIDs = Object.entries(totalVotes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(pair => pair[0])
      const topRestaurantIDs = Object.entries(totalVotes)
        .sort((a, b) => {
          if (b[1] === a[1]) {
            return a[0].localeCompare(b[0]); // lexicographically sort based on key
          }
          return b[1] - a[1]; // sort based on value
        })
        .map(pair => pair[0]);

        const randomize = async () => {
          const recommendation = topRestaurantIDs[Math.floor(Math.random() * topRestaurantIDs.length)]
          table.recommendation = recommendation
          await UpdateTable(table)
        }
      return (
        <Flex direction="column" justify="center" align="center" className="m-5 w-full">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center mr-10"/>
          <Text ta="center" className="text-4xl font-black -mt-5" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Results</Text>
          <Grid className="w-full">
            <Grid.Col span={4}>
              <Center className="flex-col rounded-3xl bg-rose-50 shadow-red-100 shadow-xl py-10 my-10">
                <Text ta="center" className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Pick a Place</Text>
                <Container mah={500} className="mb-5">
                  { topRestaurantIDs.length > 0 ? 
                    <Flex direction="column" justify="center" align="center">
                      { table.recommendation ? 
                        <ShowCard id={ table.recommendation } /> : 
                        user.uid == table.leader ?
                        null :
                        <Text className="text-center">Wait for your leader to generate a recommendation</Text>
                      }
                      { user.uid == table.leader ? 
                        <Button color="red" className="mt-5" onClick={randomize}>
                          Randomize
                        </Button> :
                        null
                      } 
                    </Flex> : 
                    <>
                      {'No one voted for anything :('}
                    </>
                  }
                </Container>
              </Center>
            </Grid.Col>
            <Grid.Col span={4}>
              <Center className="flex-col rounded-3xl bg-rose-50 shadow-red-100 shadow-xl my-10 py-10">
                <Text ta="center" className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Ranking</Text>
                <Container mah={500} className="overflow-y-scroll space-y-3 mb-5">
                  {topRestaurantIDs.length > 0 ?
                    (topRestaurantIDs.map((id: string, idx) => (
                      <Flex key={idx} className="space-x-5 items-center">
                        <Flex direction="column">
                          <Title color="red">#{ idx + 1 }</Title>
                          <small className="text-center text-xs">Votes:{ Math.floor(totalVotes[id]) }</small>
                        </Flex>
                        <RestaurantPreviewCard 
                          key={ id } 
                          data={ table.restaurantList.find(i => i.id == id) }
                        />
                      </Flex>
                    )))
                    :
                    (<>
                      {'No one voted for any restaurant :('}
                    </>)

                  }
                </Container>
              </Center>
            </Grid.Col>
            <Grid.Col span={4}>
              <Center className="flex-col rounded-3xl bg-rose-50 shadow-red-100 shadow-xl my-10 py-10">
                <Text ta="center" className="mb-10 text-5xl font-black" variant="gradient" gradient={{from: "red.7", to: "red.4"}}>Crowd Favs</Text>
                <Container mah={500} className="overflow-y-scroll space-y-3 mb-5">
                  {topRestaurantIDs.filter(i => totalVotes[i] >= 2).length > 0 ?
                    (topRestaurantIDs.filter(i => totalVotes[i] >= 2).map((id: string, idx) => (
                      <Flex key={idx} className="space-x-5 items-center">
                        <Flex direction="column">
                          <Title color="red">#{ idx + 1 }</Title>
                          <small className="text-center text-xs">Votes:{ Math.floor(totalVotes[id]) }</small>
                        </Flex>
                        <RestaurantPreviewCard 
                          key={ id } 
                          data={ table.restaurantList.find(i => i.id == id) }
                        />
                      </Flex>
                    )))
                    :
                    (<>
                      {'No one voted for the same restaurant :('}
                    </>)
                  }
                </Container>
              </Center>
            </Grid.Col>
          </Grid>
          <Button color="red" onClick={HandleDone} rightIcon={<IconDoorExit />}>
            Back to Home
          </Button>
        </Flex>
      )
      
    } else {
      // show waiting page
      return (
        <Center className="flex-col rounded-3xl bg-white shadow-red-100 shadow-xl p-10 m-10">
      <Text style={{ padding: '40px' }} className="mb-10 text-5xl font-black" variant="gradient" gradient={{ from: "red.7", to: "red.4" }}>
        Waiting for your table mates to finish voting {`(${table.usersDoneVoting.length}/${Object.keys(table.users).length})...`}
      </Text>
      <div className="relative h-64 w-64 mx-auto">
        {images.map((image, index) => (
          <Image
            key={image}
            maw={240}
            mx="auto"
            radius="md"
            src={image}
            alt="Waiting image"
            className={`absolute top-0 left-0`}
            style={{
              opacity: currentImageIndex === index ? 1 : 0,
              animationName: currentImageIndex === index ? 'fadeIn' : undefined,
              animationDuration: '1s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 1,
              animationFillMode: 'forwards',
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Center>
          

        
      )
      
    }
  } else {
    return (
      <>
      </>
    )
  }

}