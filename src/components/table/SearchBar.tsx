import { Text, TextInput, TextInputProps, ActionIcon, useMantineTheme, Autocomplete } from '@mantine/core';
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import { IconSearch, IconArrowRight, IconArrowLeft, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

//@ts-ignore
import seedrandom from 'seedrandom'

export default function SearchBar(props : { setCuisine : any }) {

  const theme = useMantineTheme();

  const [value, setValue] = useState('');
  const [data, setData] = useState<string[]>()

  const getCategories = async () => {
    const res = await fetch("/api/categories")
    if (!res.ok) {
      showNotification({
        title: "Yikes",
        message: "Failed to load category data",
        icon: <IconX />,
        color: "red"
      })
      return
    }
    const resJSON = await res.json()
    setData(resJSON.categories.map((item: any) => item.title + ` (${Math.round(seedrandom(item.title)() * 100)})`))
  }

  useEffect(() => {
    if (!data)
      getCategories()
    props.setCuisine(value.split(" ")[0])
  }, [value]);

  return (
    <>
    <NotificationsProvider />
    <Autocomplete
      label="Search For Cuisines"
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={setValue}
      placeholder="Search Cuisines"
      rightSectionWidth={42}
      data={data ?? []}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction='ease'
      
    />
    </>
  );
}