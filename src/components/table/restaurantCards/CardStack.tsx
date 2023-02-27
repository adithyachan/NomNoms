import ShowCard from "./Card";
import { useState } from 'react'

import { Card, Image, Text, Badge, Button, Group, Popover } from '@mantine/core';
import { useRestaurantBusinessEndpoint } from '@/lib/utils/yelpAPI';
import { Loader } from '@mantine/core';
import { BackgroundImage, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function CardStack({ids} : any) {
  let index = 0;
  const [id, setID] = useState(ids[index])
  if (ids.length == 0) return (<Text size="md" color="dimmed">Card stack is empty!</Text> )


  return (
    <>
      <ShowCard id={id} />
      <div style={{display: 'flex', gap: 10}}>
        <Button color="green">Yes</Button>
        <Button color="red">No</Button>
      </div>
    </>
  )
  
}