import ShowCard from "./Card";
import React, {  ReactNode, useEffect, useState } from 'react'
import { IconArrowBack, IconCheck, IconThumbDown, IconThumbUp, IconX, IconChevronRight} from '@tabler/icons-react'

import { Card, Text, Button, Tooltip, Progress, NavLink } from '@mantine/core';
import { JsxElement } from "typescript";
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
  //console.log(listData.businesses)
  var prices = new Map()
  var names = []
  var reviewNos = []
  var ratings = []
  var neededBusiness :any
  var price = ""
  const cards3  = new Map
//  {[key:string] : typeof DynamicComponent}= {}
  for(var i =0; i < ids.length;i++) {
    //console.log(listData[0])
    neededBusiness = listData.businesses[i]
    price = neededBusiness.price 
    prices.set(ids[i], price)
   cards3.set(ids[i], <DynamicComponent id = {ids[i]} />)

  }

  //onst cards = [cards3.get(ids[0]), cards3.get(ids[1]), cards3.get(ids[2]) ]
 //lists start
  //const cards = ids.map((id: string) => <ShowCard key={id} id={id}/>)
  const [ids1, setIds] = useState(ids)
  const [cards, setCards] = useState([cards3.get(ids1[0]), cards3.get(ids1[1]), cards3.get(ids1[2]) ])
  const [index, setIndex] = useState(0)
  const [card, setCard] = useState(cards[index])
  const [canFinish, setCanFinish] = useState(false)
  const [canSkip, setCanSkip] = useState(true)
  const [flag, setFlag] = useState(false)
  //setCards( [cards3.get(ids[1]), cards3.get(ids[0]), cards3.get(ids[2]) ])

  // not to be confused with setUserVotes, which is a setter function passed into this component
  // in order to set this user's votes. 
  // setVotes is meant to update the user's votes as they are going through the card stack,
  // setUserVotes will update the user's votes in the Table once the user hits Done.

  const [votes, setVotes] = useState(ids1.reduce((acc: any, cur: any) => ({...acc, [cur]: 0}), {}))
  
  
  //setCards([cards3.get(ids[0]), cards3.get(ids[1]), cards3.get(ids[2])])
  
  cards.push(
    <div style={{height: '450px', width: '450px'}}>
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
    
  )
     useEffect(() => {
      
      if (flag) {
      // var cards4 = []
      //  for (var i = 0; i < ids.length; i++) {
      //     cards4[i] = cards3.get(ids[i])
      //  }
       setCards([cards3.get(ids1[0]), cards3.get(ids1[1]), cards3.get(ids1[2]) ])
       setIndex(0)
       setCard(cards[0])
       setCanSkip(false)
       setCanFinish(false)
       setVotes(ids1.reduce((acc: any, cur: any) => ({...acc, [cur]: 0}), {})) 
      setFlag ( false)
     } else {
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
    setFlag (true)
    const r = ids1[2]
  const g = ids1[1]
  const b = ids1[0]
  setIds( [r,g,b])
  console.log(index)
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
          
          <div style={{paddingTop: '100px'}}>

            {card}
            <div style={{paddingBottom: '30px', paddingTop: '10px', justifyContent: 'center', alignItems: 'center', display: 'flex', gap: 35}}>
              <BackButton />
              <YesButton />
              <NoButton />
              <FinishButton />
              <TestButton />
            </div>
            <Skip />
          </div>
        </div>

      </>
    )
    
  }
    
  
}