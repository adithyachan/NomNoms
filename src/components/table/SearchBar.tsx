import { Text, TextInput, TextInputProps, ActionIcon, useMantineTheme, Autocomplete } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

export default function SearchBar(props: any) {

  const theme = useMantineTheme();

  return (
    <>
    <Autocomplete
      label="Search For Cuisines"
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color="red" variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Cuisines"
      rightSectionWidth={42}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction='ease'

    />
    </>
  );
}