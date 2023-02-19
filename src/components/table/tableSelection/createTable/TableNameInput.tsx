import { useEffect } from 'react';
import { TextInput, Tooltip, createStyles, Container } from '@mantine/core';
import { useInputState, useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}));

const special_chars = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/

export default function TableNameInput(props: {updateValidName: any}) {
  const updateValidName = props.updateValidName
  const [value, setValue] = useInputState('');
  const [opened, handlers] = useDisclosure();

  // Input validation
  const special_chars_check = !special_chars.test(value)
  const length_check = value.length >= 4 && value.length <= 16
  const valid = special_chars_check && length_check;
  
  useEffect(() => {
    updateValidName({ valid: valid, name: value})
  }, [updateValidName, valid, value])

  // styles
  const { classes } = useStyles({ floating: value.trim().length !== 0 || opened })

  return (
    <Container fluid className={opened || value.trim().length !== 0 ? "py-5" : "pb-4"}>
      <Tooltip
      label={length_check ? special_chars_check ? null : "No special characters" : "Name must be 4-16 characters"}
      position="left"
      withArrow
      opened={opened && !valid}
      color={"red.8"}
      >
        <TextInput
          label="Table Name"
          placeholder="Table Name"
          onFocus={() => handlers.open()}
          onBlur={() => handlers.close()}
          mt="md"
          classNames={classes}
          value={value}
          onChange={setValue}
        />
      </Tooltip>
    </Container>
  );
}