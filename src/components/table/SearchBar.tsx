import { useMantineTheme, Autocomplete, MultiSelect } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function SearchBar(props : { setCuisine : any , data : string[]}) {

  const [value, setValue] = useState<string []>([]);
  useEffect(() => {
    console.log(value)
    const cuisines = value.map(val => val.split(" (")[0]);
    props.setCuisine(cuisines);
  }, [value]);

  return (
    <>
      <MultiSelect 
      label={`Search Cuisines (${props.data.length})`}
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={setValue}
      placeholder="Search for cuisines"
      rightSectionWidth={42}
      data={props.data ?? null}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction='ease'
      nothingFound="Nothing found"
      searchable
      clearable
      dropdownComponent="div"
      >
      </MultiSelect>
    </>
  );
}

/*
    <Autocomplete
      label={`Search Cuisines (${props.data.length})`}
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={setValue}
      placeholder="Start typing to search for cuisines"
      rightSectionWidth={42}
      data={props.data ?? null}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction='ease'
      limit={8}
    />
    */