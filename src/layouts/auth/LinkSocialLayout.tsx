import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
// import { CreateAccountEmailandPassword } from '@/lib/firebase/auth/AuthService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInAnonymously, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import {
  Text,
  createStyles,
  Paper,
  Group,
  PaperProps,
  Image,
  Container,
} from '@mantine/core';
import { GoogleButtonLink, GithubButtonLink} from "@/components/auth/SocialButtons"
import { useRouter } from "next/router";
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

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
  const HandleForgot = (e : any) => {
    router.push('/auth/resetpass')
  }

  const HandleGuestSignIn = async (e : any) => {
    const auth = useFirebaseAuth();
    
    signInAnonymously(auth)
    .then(() => {
        // Signed in..
        console.log("signed in as guest");
        setTimeout(() => {
          router.push('/auth/createUsername');
        }, 10)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ...
    });
  }
  
  //disable the button if the inputs are not valid  
  const HandleLogin = async (e : any) => {
    const auth = useFirebaseAuth();
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
    .then((userCredential) => {
        console.log("login is working");
        setTimeout(() => {
          router.push('/tables');
        }, 10)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          showNotification({
            title: 'Incorrect username or password!',
            message: 'Please enter the correct information',
            autoClose: 4000,
            color: 'red',
            icon: <IconX size={16} />,
            
            styles: () => ({
              closeButton: {
                color: '#F43F5E',
                '&:hover': { backgroundColor: '#F43F5E' },
              },
            }),            
          })
        } else if (errorCode === 'auth/too-many-requests') {
          showNotification({
            title: 'Account temporarily disabled!',
            message: 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
            autoClose: 4000,
            color: 'red',
            icon: <IconX size={16} />,
            
            styles: () => ({
              closeButton: {
                color: '#F43F5E',
                '&:hover': { backgroundColor: '#F43F5E' },
              },
            }),            
          })
        } else if (errorCode === 'auth/user-not-found') {
          showNotification({
            title: 'Account was not found',
            message: 'This email or username is not registered with NomNoms! Enter the correct information or register for an account',
            autoClose: 4000,
            color: 'red',
            icon: <IconX size={16} />,
            
            styles: () => ({
              closeButton: {
                color: '#F43F5E',
                '&:hover': { backgroundColor: '#F43F5E' },
              },
            }),            
          })
        }
        console.log(errorCode);
        console.log(errorMessage);
      
    });
   // resetForm();
  }

  const provider = new GoogleAuthProvider();
  const Githubprovider = new GithubAuthProvider();

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
      <NotificationsProvider> 
      <Container size={500} my={50} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
        <Group position="right">

        </Group>

        <Text color="dimmed" size="sm" align="center">
          Want to add google or github to your account?
            </Text>

        <Group grow mb="md" mt="xl">
        <GoogleButtonLink radius="xl">Google</GoogleButtonLink>
        <GithubButtonLink radius="xl">GitHub</GithubButtonLink>
        </Group>         

        </Container>
        </NotificationsProvider>
    </Paper>
  </form> 
  );
}
