import { Text, TextInput, TextInputProps, ActionIcon, useMantineTheme, Autocomplete } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function SearchBar(props : { setCuisine : any , data : string[]}) {

  const theme = useMantineTheme();

  const [value, setValue] = useState('');
  const data = value.length > 0 ? props.data.filter(i => i.toLowerCase().includes(value)) : []
  useEffect(() => {
    props.setCuisine(value.split(" (")[0])
  }, [value]);

  return (
    <>
    <Autocomplete
      label={`Search Cuisines (${props.data.length})`}
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={setValue}
      placeholder="Start typing to search for cuisines"
      rightSectionWidth={42}
      data={data}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction='ease'
      limit={8}
    />
    </>
  );
}