import { createStyles, Container, Text, Button, Group, Image } from '@mantine/core';
import { IconLogin } from '@tabler/icons';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 100,
    paddingBottom: 120,
    display: 'flex',
    flexDirection: 'column',

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function Hero() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>

        <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
        <h1 className={classes.title}>
          {`Can't  `}
          <Text component="span" color="red" inherit>
            decide
          </Text>{' '}
          where to eat?{' '}
        </h1>

        <Text className={classes.description} color="dimmed">
          Stop fighting over restaurants with your friends. Food faster, become a{' '}
          <Text component="span" color="red" inherit>
            Nomster
          </Text>{'.'}
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="filled"
            color="red"
          >
            Sign Up
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<IconLogin size={20}/>}
          >
            Log In
          </Button>
        </Group>
      </Container>
    </div>
  );
}