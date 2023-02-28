import ShowCard from "./Card";
import { useEffect, useState } from 'react'
import { IconArrowBack, IconCheck, IconThumbDown, IconThumbUp, IconX } from '@tabler/icons'

import { Card, Image, Text, Badge, Button, Group, Popover, Tooltip, Progress } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
import { Loader } from '@mantine/core';
import { BackgroundImage, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function CardStack({ids, setUserVotes} : any) {
  const cards = ids.map((id: string) => <ShowCard key={id} id={id}/>)
  const [index, setIndex] = useState(0)
  const [card, setCard] = useState(cards[index])
  const [canFinish, setCanFinish] = useState(false)

  // not to be confused with setUserVotes, which is a setter function passed into this component
  // in order to set this user's votes. 
  // setVotes is meant to update the user's votes as they are going through the card stack,
  // setUserVotes will update the user's votes in the Table once the user hits Done.

  const [votes, setVotes] = useState(ids.reduce((acc: any, cur: any) => ({...acc, [cur]: 0}), {}))

  cards.push(
    <div style={{height: '410px', width: '410px'}}>
      <Card withBorder radius='md' style={{height: '100%'}}>
        <Text weight={500}>You&apos;re all done!</Text>
        <Text size="sm" color="dimmed">
          You may either go back and change your votes, or hit finish to submit.
        </Text>
      </Card>
    </div>
    
  )

  useEffect(() => {
    setCard(cards[index])
    if (index == cards.length - 1)
      setCanFinish(true);
  }, [index])

  function handleYesClick() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setVotes((votes: any) => ({
        ...votes, 
        [ids[index]]: 1,
      }));
    }
  }
  function handleNoClick() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setVotes((votes: any) => ({
        ...votes, 
        [ids[index]]: 0,
      }));
    }
  }
  function handleBackClick() {
    if (index > 0) 
      setIndex(index - 1);
  }
  function handleFinishClick() {
    console.log(votes)
    // setUserVotes(votes)
    // TODO: redirect to waiting for other nomsters to finish their votes page
  }
  
  function FinishButton() {
    if (! canFinish) {
      return (
        <Tooltip label="Finish voting on all the cards before submitting!">
          <span>
            <Button disabled variant='outline' radius='xl' color="gray">Done</Button>
          </span>
        </Tooltip>
      )
    } else {
      return (
        <Button onClick={handleFinishClick} variant='outline' radius='xl' color="blue">
          Done
        </Button>
      )
    }
  }
  function YesButton() {
    if (index == cards.length - 1) {
      return (
        <Button disabled variant='outline' radius='xl' color="green">
          <IconThumbUp color='green' size={12} stroke={2} />
        </Button>
      )
    } else {
      return (
        <Button onClick={handleYesClick} variant='outline' radius='xl' color="green">
          <IconThumbUp color='green' size={12} stroke={2} />
        </Button>
      )
    }
  }
  function NoButton() {
    if (index == cards.length - 1) {
      return (
        <Button disabled variant='outline' radius='xl' color="red">
          <IconThumbDown color='red' size={12} stroke={2} />
        </Button>
      )
    } else {
      return (
        <Button onClick={handleNoClick} variant='outline' radius='xl' color="red">
          <IconThumbDown color='red' size={12} stroke={2} />
        </Button>
      )
    }
  }
  function BackButton() {
    if (index == 0) {
      return (
        <Button disabled variant='outline' radius='xl' color="yellow">
          <IconArrowBack color='orange' size={12} stroke={2} />
        </Button>
      )
    } else {
      return (
        <Button onClick={handleBackClick} variant='outline' radius='xl' color="yellow">
          <IconArrowBack color='orange' size={12} stroke={2} />
        </Button>
      )
    }
  }
  
  if (ids == undefined || ids.length == 0) return (<Text size="md" color="dimmed">Card stack is empty!</Text> )

  else{
    return (
      <>
        <Progress color="red" value={((index / (cards.length - 1)) * 100)} />
        {card}
        <div style={{display: 'flex', gap: 10}}>
          <BackButton />
          <YesButton />
          <NoButton />
          <FinishButton />
          
        </div>
      </>
    )
    
  }
    
  
}