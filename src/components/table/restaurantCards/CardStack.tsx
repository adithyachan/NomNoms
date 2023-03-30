import ShowCard from "./Card";
import React, { useEffect, useState } from 'react'
import { IconArrowBack, IconCheck, IconThumbDown, IconThumbUp, IconX, IconChevronRight, IconSortAscending, IconSortDescending} from '@tabler/icons-react'
import { Card, Text, Button, Tooltip, Progress, NavLink, MenuItemProps } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from "@/lib/utils/yelpAPI";
import {List, Group, useMantineTheme } from '@mantine/core';
//import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";
type ComponentProps = {
  id: string;
};

type ComponentMap = {
  [key: string]: React.FC<ComponentProps>;
};
const componentMap: ComponentMap = {
  myComponent: ShowCard,
};
const DynamicComponent = componentMap["myComponent"];
export default function CardStack({listData,ids, setState, setUserVotes, user} : any) {
  //console.log("All businesses: " + listData.businesses)
  var prices = new Map()
  var revinfo = new Map()
  var rating = 0
  var neededBusiness :any
  var price = ""
  const cards3  = new Map
  var review_count = 0
  for(var i =0; i < ids.length;i++) {
    //console.log(listData[0])
    neededBusiness = listData.businesses[i]
    rating = neededBusiness.rating
    price = neededBusiness.price 
    review_count = neededBusiness.review_count
    if (review_count == undefined) {
      review_count = 0
    }
    if (price == undefined) {
      price = ''
    }
    if (rating == undefined) {
      rating = 0
    }
    prices.set(ids[i], price)
    revinfo.set(ids[i], [rating, review_count])

   cards3.set(ids[i], <DynamicComponent id = {ids[i]} />)

  }
  //console.log(revinfo)

 
  //const cards = ids.map((id: string) => <ShowCard key={id} id={id}/>)
  const card6 = <div style={{height: '450px', width: '450px'}}>
  <Card withBorder radius='md' style={{height: '100%'}}>
    <div style={{padding: '5px'}}></div>
    <Text weight={500}>That&apos;s it!</Text>
    <div style={{padding: '5px'}}></div>
    <Text size="sm" color="dimmed">
      You may either go back and change your votes, or hit the check to submit
      and wait for the rest of your tablemates to finish their votes.
    </Text>
  </Card>
</div> 

  const [ids1, setIds] = useState(ids)
  const [cards, setCards] = useState([cards3.get(ids1[0]), cards3.get(ids1[1]), cards3.get(ids1[2]),cards3.get(ids1[3]), cards3.get(ids1[4]), cards3.get(ids1[5]),cards3.get(ids1[6]), cards3.get(ids1[7]), cards3.get(ids1[8]),cards3.get(ids1[9]),card6 ])
  //console.log(cards.length + "Before push")
  const [index, setIndex] = useState(0)
  const [card, setCard] = useState(cards[index])
  const [canFinish, setCanFinish] = useState(false)
  const [canSkip, setCanSkip] = useState(true)
  const [flag, setFlag] = useState(false)

  // not to be confused with setUserVotes, which is a setter function passed into this component
  // in order to set this user's votes. 
  // setVotes is meant to update the user's votes as they are going through the card stack,
  // setUserVotes will update the user's votes in the Table once the user hits Done.

const [votes, setVotes] = useState(ids1.reduce((acc: any, cur: any) => ({...acc, [cur]: 0}), {}))
  
  
  
 // console.log("After push " + cards.length)
     useEffect(() => {
      
      if (flag) {
        console.log("Sorting")
  //    console.log(cards.length + " Before") 

      console.log(cards )
      setCards([cards3.get(ids1[0]), cards3.get(ids1[1]), cards3.get(ids1[2]),cards3.get(ids1[3]), cards3.get(ids1[4]), cards3.get(ids1[5]),cards3.get(ids1[6]), cards3.get(ids1[7]), cards3.get(ids1[8]),cards3.get(ids1[9]),card6] )
  console.log(cards)
  //    console.log(cards + " After")
  //console.log(card)
       setIndex(0)
    //   console.log(card)
       //setCard(cards[0])
       setCanSkip(false)
       setCanFinish(false)
       setVotes(ids1.reduce((acc: any, cur: any) => ({...acc, [cur]: 0}), {})) 
      setFlag ( false)
     } else {
      console.log("Changing id")
      setCard(cards[index])
      if (index == cards.length - 1)
        setCanFinish(true); 
     }},[ids1,index])

  // useEffect(() => {
  //   setCard(cards[index])
  //   if (index == cards.length - 1)
  //     setCanFinish(true);
  // }, [index])

  
  function handleYesClick() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setCanSkip(false);
      setVotes((votes: any) => ({
        ...votes, 
        [ids1[index]]: 1,
      }));
    }
  }
  function handleSortClick() {
    //const [ascending, setAscending] = useState(true);
    var price = "$"
    let list: (string | number)[][] = [];
    console.log(ids)
    for (var i = 0; i < ids.length; i++) {
      //const { data: businessData, error: businessError, isLoading: isLoadingBusiness } = useRestaurantBusinessEndpoint(ids[i]);
      //var price = businessData?.price;
      list[i] = [ids[i], price];
      price+="$"
    }
    var temp = list[0];
    //if (ascending) {
      for (var i = 0; i < ids.length - 1; i++) {
        for (var j = 0; j < ids.length - i - 1; j++) {
          if (list[j][1]?.toString().length < list[j + 1][1]?.toString().length) {
            temp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = temp;
          }
        }
      }
    // } else {
    //   for (var i = 0; i < ids.length - 1; i++) {
    //     for (var j = 0; j < ids.length - i - 1; j++) {
    //       if (list[j][1]?.toString().length < list[j + 1][1]?.toString().length) {
    //         temp = list[j];
    //         list[j] = list[j + 1];
    //         list[j + 1] = temp;
    //       }
    //     }
    //   }
    // }
    ids = list.map((entry) => entry[0]);
    //setCard(ids.map((id: string) => <ShowCard key={id} id={id}/>));
    console.log(ids)
  }
  
  const MyMenu: React.FC = () => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
  
    const handleClose = () => {
      setOpened(false);
    };
  
    const handleToggle = () => {
      setOpened(!opened);
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Button variant="outline" onClick={handleToggle}>
            Sort
          </Button>
          {opened && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SortPriceButton/>
              <SortLexButton/>
            </div>
          )}
        </div>
      </div>
    );
  };
  

  function handleNoClick() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setCanSkip(false);
      setVotes((votes: any) => ({
        ...votes, 
        [ids1[index]]: 0,
      }));
    }
  }
  function handleBackClick() {
    if (index > 0) 
      setIndex(index - 1);
  }
  function handleFinishClick() {
    
    Object.keys(votes).forEach(key => {
      if (votes[key] == 0) {
        delete votes[key]
      }
    })
    //console.log(votes)
    setUserVotes(votes)
    setState('favorite')
    

    // setUserVotes(votes)
    // TODO: redirect to waiting for other nomsters to finish their votes page
  }

  function handleSort() {
    //console.log(index)
  //setFlag (true)
    //const r = ids1[2]
    //const e = SortByPrice({hashm : prices})
    //setIds(e)
    //setIds(ReviewSort({
    //  hashm: revinfo,
    //  ascending: true
    //}))
  //const g = ids1[1]
  //const b = ids1[0]
  //setIds( [r,g,b])
  
  }
  
  function FinishButton() {
    if (! canFinish) {
      return (
        <Tooltip label="Finish voting on all the cards before submitting!">
          <span>
            <Button size="lg" disabled variant='light' radius='xl'>
              <IconCheck color='blue' size={20} stroke={1.5} />
            </Button>
          </span>
        </Tooltip>
      )
    } else {
      return (
        <Button size="lg" onClick={handleFinishClick} variant='light' radius='xl' color="blue">
          <IconCheck color='blue' size={20} stroke={1.5} />
        </Button>
      )
    }
  }
  function YesButton() {
    
    if (index == cards.length - 1) {
      return (
        <Button size="lg" disabled variant='light' radius='xl' color="green">
          <IconThumbUp color='green' size={20} stroke={1.5} />
        </Button>
      )
    } else {
      return (
        <Button size="lg" onClick={handleYesClick} variant='light' radius='xl' color="green">
          <IconThumbUp color='green' size={20} stroke={1.5} />
        </Button>
      )
    }
  }
  function NoButton() {
    if (index == cards.length - 1) {
      return (
        <Button size="lg" disabled variant='light' radius='xl' color="red">
          <IconThumbDown color='red' size={20} stroke={1.5} />
        </Button>
      )
    } else {
      return (
        <Button size="lg" onClick={handleNoClick} variant='light' radius='xl' color="red">
          <IconThumbDown color='red' size={20} stroke={1.5} />
        </Button>
      )
    }
  }
  function TestButton() {
    //flag = true
    
    return (<Button size="lg" onClick={handleSort} variant='light' radius='xl' color="yellow">
          <IconArrowBack color='black' size={20} stroke={1.5} />
        </Button>)
  }
  function BackButton() {
    if (index == 0) {
      return (
        <Button size="lg" disabled variant='light' radius='xl' color="yellow">
          <IconArrowBack color='orange' size={20} stroke={1.5} />
        </Button>
      )
    } else {
      return (
        <Button size="lg" onClick={handleBackClick} variant='light' radius='xl' color="yellow">
          <IconArrowBack color='orange' size={20} stroke={1.5} />
        </Button>
      )
    }
  }

  
  function SortPriceButton() {
    const [ascending, setAscending] = useState(true);
    const toggleAscending = () => {
      setAscending(!ascending);
      handleSortClick();
      //console.log(ids)
    };
    if (ascending) {
      return (
        // <Button size="lg" onClick={toggleAscending} variant='light' radius='xl' color="yellow">
        //   <IconSortAscending color='orange' size={20} stroke={1.5} />
          <Tooltip label="Ascending price">
          <span>
          <Button size="lg" onClick={toggleAscending} variant='light' radius='xl' color="yellow">
          <IconSortAscending color='orange' size={20} stroke={1.5} />
        </Button>
          </span>
        </Tooltip>
       // </Button>
      );
    } else {
      return (
        <Tooltip label="Descending price">
          <span>
          <Button size="lg" onClick={toggleAscending} variant='light' radius='xl' color="yellow">
          <IconSortDescending color='orange' size={20} stroke={1.5} />
        </Button>
          </span>
        </Tooltip>
      );
    }
}

function SortLexButton() {
  const [ascending, setAscending] = useState(true);
    const toggleAscending = () => {
      setAscending(!ascending);
    };
    if (ascending) {
      return (
        // <Button size="lg" onClick={toggleAscending} variant='light' radius='xl' color="yellow">
        //   <IconSortAscending color='orange' size={20} stroke={1.5} />
          <Tooltip label="Ascending lex">
          <span>
          <Button size="lg" onClick={toggleAscending} variant='light' radius='xl' color="yellow">
          <IconSortAscending color='orange' size={20} stroke={1.5} />
        </Button>
          </span>
        </Tooltip>
       // </Button>
      );
    } else {
      return (
        <Tooltip label="Descending lex">
          <span>
          <Button size="lg" onClick={toggleAscending} variant='light' radius='xl' color="yellow">
          <IconSortDescending color='orange' size={20} stroke={1.5} />
        </Button>
          </span>
        </Tooltip>
      );
    }
}

  function Skip() {
    if (canSkip) {
      return (
        <NavLink onClick={() => handleFinishClick()} active={true} variant="subtle" color="red" label="Or, if you&apos;re fine with anything your friends choose, skip voting" rightSection={<IconChevronRight size="0.8rem" stroke={1.5}/>} />
      )
    } else {
      return (
        <></>
      )
    }
  }

  if (ids1 == undefined || ids1.length == 0) return (<Text size="md" color="dimmed">Card stack is empty!</Text> )

  else{
    return (
      <>
        <Progress color="red" value={((index / (cards.length - 1)) * 100)} />
        <MyMenu/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
          <div style={{paddingTop: '100px'}}>

            {card}
            <div style={{paddingBottom: '30px', paddingTop: '10px', justifyContent: 'center', alignItems: 'center', display: 'flex', gap: 35}}>
              <BackButton />
              <YesButton />
              <NoButton />
              <FinishButton />
            </div>
            <Skip />
          </div>
        </div>
      </>
    )
    
  }
    
  
}