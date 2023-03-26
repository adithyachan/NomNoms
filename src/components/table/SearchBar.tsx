import { createStyles, Header, Autocomplete, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${40} ${52}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));


export default function SearchBar(props : any) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <MantineLogo size={28} />
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="2" stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
        </Group>
      </div>
    </Header>
  );
}