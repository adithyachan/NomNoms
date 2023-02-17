import { TextInput, createStyles } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}));

export default function InputValidation(props: {valid: boolean}) {
  const { classes } = useStyles();
  return (
<></>
  );
}