import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useRouter } from "next/router";

import {
  TextInput,
  PasswordInput,
  Text,
  createStyles,
  Paper,
  Group,
  PaperProps,
  Button,
  Image,
  Container,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';


export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['NomNom!', 'login']);
  const router = useRouter();
  console.log(type)
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      username: '',
      terms: true,
    },

  });

  const HandleLogin = (e : any) => {
    router.push('/auth/login')
  }



  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
    invalid: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
    },
    icon: {
      color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
    },
  }));

  const { classes } = useStyles();

  

  return (
    <form onSubmit={form.onSubmit(HandleLogin)}>
    <Paper radius="md" p="xl" withBorder {...props}>
      <Container size={500} my={50} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>


          <Text color="dimmed" size="sm" align="center">
              Sign in as a guest below!
            </Text>

        <Stack>

           <TextInput
           required
           label="Username"
           placeholder="spicyburrito"
           value={form.values.username}
           onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
           error={form.errors.username && 'Invalid username'}
         />
         
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

        
        
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              color = "pink"
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />


        </Stack>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="pink"
            size="xs"
            onClick={HandleLogin}
          >
          Already have an account? Login
          </Anchor>
          
          <Button className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
          type="submit"  
          >Continue as Guest</Button>

        </Group>

        </Container>

      <Text size="sm" weight={200} align="center">
        By creating an account, you agree to our <Anchor href="https://mantine.dev/" target="_blank">
          Terms of Service and Private Policy </Anchor>
      </Text> 

    </Paper>
    </form>
   
  );
}
