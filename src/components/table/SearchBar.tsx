import { Text, TextInput, TextInputProps, ActionIcon, useMantineTheme, Autocomplete } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function SearchBar(props : { setCuisine : any , data : string[]}) {

  const theme = useMantineTheme();

  const [value, setValue] = useState('');

  useEffect(() => {
    props.setCuisine(value.split(" ")[0])
  }, [value]);

  return (
    <>
    <Autocomplete
      label="Search For Cuisines"
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={setValue}
      placeholder="Search Cuisines"
      rightSectionWidth={42}
      data={props.data ?? null}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction='ease'
      
    />
    </>
  );
}