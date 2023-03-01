import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
// import { CreateAccountEmailandPassword } from '@/lib/firebase/auth/AuthService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInAnonymously, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {
  TextInput,
  PasswordInput,
  Text,
  Title,
  createStyles,
  Paper,
  Group,
  PaperProps,
  Button,
  Image,
  MantineProvider,
  Container,
  Divider,
  useMantineColorScheme,
  ColorSchemeProvider,
  NavLink,
  Checkbox,
  Anchor,
  Stack,
  Autocomplete,
} from '@mantine/core';
import { GoogleButton, TwitterButton, GithubButton} from "@/components/auth/SocialButtons"
import { formatDiagnostic } from 'typescript';
import { useRouter } from "next/router";

export default function LogInForm (props: PaperProps) {
  //Router
  const router = useRouter();
  //Form
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
  },
  });
  const resetForm = () => {
    form.values.email = '';
    form.values.name = '',
    form.values.password = '',
    form.values.terms = true
  }


  //Return user to register page
  const HandleRegister = (e : any) => {
    router.push('/auth/register')
  }

  
  //disable the button if the inputs are not valid
  const HandleLogin = async (e : any) => {
    const auth = useFirebaseAuth();
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
    .then((userCredential) => {

        const user = userCredential.user;

        // ...
    })
    .catch((error) => {
      const checkUser = auth.currentUser;
      if (!checkUser) {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    });
    resetForm();
  }

  const provider = new GoogleAuthProvider();



  const facebookprovider = new FacebookAuthProvider();

  const HandleFacebook = async (e: any) => {
      console.log("checking facebook")
      const auth = useFirebaseAuth();
      signInWithPopup(auth, facebookprovider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
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

        <Stack>
           <TextInput
           required
           label="Email or username"
           placeholder="nomnoms@gmail.com"
           value={form.values.email}
           onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
           error={form.errors.email && 'Invalid email'}
         />
         
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />


        </Stack>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="pink"
            size="xs"
            onClick={HandleRegister}
          >
          <div>Don&apos;t have an account? Register</div>
          </Anchor>
          
          <Button className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
          type="submit"  
          >Login</Button>

        </Group>


        <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <GithubButton radius="xl">GitHub</GithubButton>
          </Group>
        </Container>
    </Paper>
  </form> 
  );
}
