import { useMantineTheme, Autocomplete, MultiSelect } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function SearchBar(props : { setCuisine : any , 
  data : string[], 
  reset : any, 
  setReset : any,
  rand : any,
  setRand : any}) {

  const [value, setValue] = useState<string []>([]);
  useEffect(() => {
    if (props.reset) {
      setValue([])  
      props.setReset(false)
    } else if (props.rand && props.data.length != 0) {
      const max = props.data.length;
      const min = 0
      const newNumbers = [] as any
      while (newNumbers.length < 3) {
        const randomNum = Math.floor(Math.random()*(max - min) + min); // generate a random number between 1 and 10
        if (!newNumbers.includes(randomNum)) {
          newNumbers.push(randomNum);
        }
      }
      setValue([props.data[newNumbers[0]], props.data[newNumbers[1]], props.data[newNumbers[2]]])
      props.setRand(false)
    } else {
      console.log(value)
      const cuisines = value.map(val => val.split(" (")[0]);
      props.setCuisine(cuisines);
    }
  }, [value, props.reset, props.rand]);

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