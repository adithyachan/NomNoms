import ShowCard from "./Card";
import React, { useEffect, useState } from 'react'
import { IconArrowBack, IconCheck, IconThumbDown, IconThumbUp, IconX, IconChevronRight, IconSortAscending, IconSortDescending, IconChevronDown} from '@tabler/icons-react'
import { Card, Text, Button, Tooltip, Progress, NavLink, MenuItemProps, Input, Select } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from "@/lib/utils/yelpAPI";
import {List, Group, useMantineTheme } from '@mantine/core';
import ReviewSort from "./SortReview";
import SortByPrice from "./PriceSort";
import SortByLex from "./LexSort";
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
  var names = new Map()
  var prices = new Map()
  var revinfo = new Map()
  var rating = 0
  var neededBusiness :any
  var price = ""
  var name = ""
  const cards3  = new Map
  var review_count = 0
  for(var i =0; i < ids.length;i++) {
    neededBusiness = listData.businesses[i]
    rating = neededBusiness.rating
    price = neededBusiness.price
    name = neededBusiness.name
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
    names.set(ids[i], name)
    prices.set(ids[i], price)
    revinfo.set(ids[i], [rating, review_count])

   cards3.set(ids[i], <DynamicComponent id = {ids[i]} />)

  }

 
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
  var c1 = []
  for (var i = 0; i < ids1.length; i++) {
    c1[i] = cards3.get(ids1[i])
  }
  c1[i] = card6
  const [cards, setCards] = useState(c1)
  //const [cards, setCards] = useState([cards3.get(ids1[0]), cards3.get(ids1[1]), cards3.get(ids1[2]),cards3.get(ids1[3]), cards3.get(ids1[4]), cards3.get(ids1[5]),cards3.get(ids1[6]), cards3.get(ids1[7]), cards3.get(ids1[8]),cards3.get(ids1[9]),card6 ])
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
  
const [value, setSelectedValue] = useState<string |null>('');

  
     useEffect(() => {
      if (flag) {

      setIndex(0)
      var c1 = []
      for (var i = 0; i < ids1.length; i++) {
        c1[i] = cards3.get(ids1[i])
      }
      c1[i] = card6
      setCards(c1)
    
       
       setCard(cards[0])
       setCanSkip(false)
       setCanFinish(false)
       setVotes(ids1.reduce((acc: any, cur: any) => ({...acc, [cur]: 0}), {})) 
        setFlag ( false)
     } else {
      setCard(cards[index])
      if (index == cards.length - 1)
      setCanFinish(true); 
     }
    },[ids1, index, cards])

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

  function handleVetoClick() {
    // console.log(votes)
    Object.keys(votes).forEach(key => {
      if (votes[key] == 0 || votes[key] == 1) {
        delete votes[key]
      }
    })
    let votes2 = votes
    votes2[ids1[index]] = 1.5 
    setVotes(votes2)
    // console.log(votes)
    setUserVotes(votes)
    setState('favorite')
  }

  function handleFinishClick() {
    // Object.keys(votes).forEach(key => {
    //   if (votes[key] == 0) {
    //     delete votes[key]
    //   }
    // })
    setUserVotes(votes)
    setState('favorite')
    

    // setUserVotes(votes)
    // TODO: redirect to waiting for other nomsters to finish their votes page
  }

  const handleSort = (ascending: boolean) => {
    
    if (value == 'Price') {
      setFlag (true)
      const e = SortByPrice({hashm : prices, ascending: ascending})
      setIds(e)
    }
    else if (value == 'Review Info') {
      setFlag (true)
      setIds(ReviewSort({
          hashm: revinfo,
          ascending: ascending
        }))
    }
    else if (value == 'Lex') {
      setFlag (true)
      const f = SortByLex({hashm : names, ascending: ascending})
      setIds(f)
    }
  }

  function SettingValue(value : string|null) {
    setSelectedValue(value) 
   }
    function TypeSortButton() {
      return (
        <Select
  
        value={value}
        onChange={(value) => SettingValue(value)}//setSelectedValue(value)}
        placeholder="Sort by"
        clearable
        data={[
          { value: "Price", label: "Price" },
      { value: "Review Info", label: "Review Info" },
      { value: "Lex", label: "Lexicographically" },
        ]}
      />
  
    )
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
  function AscendingButton() {
    //flag = true
    
    return (<Tooltip label="Ascending">
    <span>
    <Button size="lg" onClick={() => handleSort(true)} variant='light' radius='xl' color="yellow">
    <IconSortAscending color='orange' size={20} stroke={1.5} />
  </Button>
    </span>
  </Tooltip>)
  }
  function DescendingButton() {
    //flag = true
    
    return (<Tooltip label="Descending">
    <span>
    <Button size="lg" onClick={() => handleSort(false)} variant='light' radius='xl' color="yellow">
    <IconSortDescending color='orange' size={20} stroke={1.5} />
  </Button>
    </span>
  </Tooltip>)
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
 
  function VetoSkip() {
    return (
   //   <NavLink onClick={() => handleVetoClick()} active={true} variant="subtle" color="red" label="Set as Favorite and skip voting" rightSection={<IconChevronRight size="0.8rem" stroke={1.5}/>} />
   <Button size="md" onClick={handleVetoClick} variant='light' radius='xl' color="pink" > Set as Favorite and skip voting!</Button>
   ) 
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
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
          <div style={{paddingTop: '30px'}}>
            {card}
            <div style={{paddingBottom: '30px', paddingTop: '10px', justifyContent: 'center', alignItems: 'center', display: 'flex', gap: 35}}>
              <BackButton />
              <YesButton />
              <NoButton />
              <FinishButton />
            </div >
            <div style={{paddingBottom: '30px', paddingTop: '10px', justifyContent: 'center', alignItems: 'center', display: 'flex', gap: 35}}>
            <AscendingButton/>
            <TypeSortButton/>
              <DescendingButton/>
              </div>
            <VetoSkip />
            <Skip />
          </div>
        </div>
      </>
    )
    
  }
    
  
}