import { useForm } from '@mantine/form';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
import { EmailAuthProvider } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { linkWithCredential } from "firebase/auth";

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
  Stack,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useRouter } from "next/router";


export default function CreateAccount (props: PaperProps) {
  //Form 
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmpassword: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),

      confirmpassword: (val, values) =>
        val !== values.password ? 'Passwords did not match' : null,
    },
  });
  //Router
  const router = useRouter();
  //Reset Form Values
  const resetForm = () => {
    form.values.email = '';
    form.values.name = '',
    form.values.password = '',
    form.values.confirmpassword = '',
    form.values.terms = true
  }

  //route user to login page
  const HandleLogin = (e : any) => {
    router.push('/auth/login')
  }

  const auth = useFirebaseAuth();
  //HandleCreate 
  const HandleLink = async (e : any) => {
    
    //console.log("register");
    const credential = EmailAuthProvider.credential(form.values.email, form.values.password);
    //createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
    //const auth = getAuth();
    if (auth.currentUser == null) {
      return undefined
    }
    linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {
    const user = usercred.user;
    console.log("Account linking success", user);
  }).catch((error) => {
    console.log("Account linking error", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
      //   showNotification({
      //     title: 'Sorry, this email is already registered with NomNoms!',
      //     message: 'Please enter another email! ',
      //     autoClose: 3000,
      //     color: 'red',
      //     icon: <IconX size={16} />,
          
      //     styles: () => ({
      //       closeButton: {
      //         color: '#F43F5E',
      //         '&:hover': { backgroundColor: '#F43F5E' },
      //       },
      //     }),            
      //   })
      // }

      // ..
      resetForm();
      //console.log("auth working")
    });

  }

    const provider = new GoogleAuthProvider();

    const HandleGoogle = async (e: any) => {
      const auth = useFirebaseAuth();
          console.log("checking google")
          signInWithPopup(auth, provider)
          .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
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
    <form onSubmit={form.onSubmit(HandleLink)}>
    <Paper radius="md" p="xl" withBorder {...props}>
    <NotificationsProvider>
      <Container size={500} my={50} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>

          <Text color="dimmed" size="sm" align="center">
          Want to add an email and password to your account?
            </Text>

        <Stack>

           <TextInput
           required
           label="Email address"
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

            <PasswordInput
            required
                label="Confirm Password"
                placeholder="Confirm your password"
                value={form.values.confirmpassword}
                onChange={(event) => form.setFieldValue('confirmpassword', event.currentTarget.value)}
                error={form.errors.confirmpassword && 'Passwords did not match'}
            />
        


        </Stack>
        <Group 
        position="apart" mt="xl" >
          <Button className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
          type="submit"
          >Register</Button>

          {/* <Center>
          <Anchor
            component="button"
            type="button"
            color="pink"
            size="xs"
            //onClick={HandleGuestSignIn}
          >



          <div>Continue as Guest</div>
          </Anchor>

        </Center> */}

        </Group>


        <Group grow mb="md" mt="md">
          </Group>
        </Container>
    </NotificationsProvider>
    </Paper>
    </form>
   
  );
}
