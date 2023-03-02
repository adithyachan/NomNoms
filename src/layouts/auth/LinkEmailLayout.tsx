import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
// import { CreateAccountEmailandPassword } from '@/lib/firebase/auth/AuthService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInAnonymously, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useRouter } from 'next/router';
import {
  TextInput,
  Text,
  createStyles,
  Paper,
  Group,
  PaperProps,
  Button,
  Image,
  Container,
  Anchor,
  Stack,
  Autocomplete,
} from '@mantine/core';

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['NomNom!', 'login']);
  console.log(type)
  const form = useForm({
    initialValues: {
      username: '',
      terms: true,
    },
    validate: {
      username: (val) => (val.length > 7 ? null : 'Username should be one word'),
  },
  });

  const router = useRouter();
  //disable the button if the inputs are not valid
    const handleCreate = async (e : any) => {
      setTimeout(() => {
        router.push('/tables');
      }, 10)
      console.log("working")
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

    <Paper radius="md" p="xl" withBorder {...props}>
     
      
        

     <form onSubmit={form.onSubmit(handleCreate)}>

      <Container size={500} my={50} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
         

          {type === 'register' && (
          <Text color="dimmed" size="xs" align="center" >
              Enter username below or use default username!
            </Text>
          )}

         <TextInput
           required
           label="Username"
           placeholder="spicyburrito"
           value={form.values.username}
           onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
           //error={form.errors.email && 'Invalid email'}
         />

        <Stack>
    

      
        </Stack>

        


        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="pink"
            onClick={() => toggle()}
            size="xs"
          >
      
          </Anchor>

        
          <Button className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} type="submit"  >{upperFirst(type)}</Button>
        </Group>


        
        </Container>
      </form>
    
    </Paper>
   
  );
}