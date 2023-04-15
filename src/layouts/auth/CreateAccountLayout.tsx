import { useForm } from '@mantine/form';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ReadDocument } from '@/lib/firebase/FirestoreOperations'; 
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
  Container,
  Checkbox,
  Anchor,
  Stack,
  Tooltip,
} from '@mantine/core';
import { GoogleButton, GithubButton} from "@/components/auth/SocialButtons"
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';
import { IconCheck, IconRefresh, IconX } from '@tabler/icons-react';
import { useRouter } from "next/router";
import { useState } from 'react';
import { IUser, User } from '@/types/User';
import { WriteUser } from '@/lib/firebase/auth/AuthOperations';
import { error } from 'console';


export default function CreateAccount (props: PaperProps) {
  //Form 
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmpassword: '',
      username: '',
      terms: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
      username: (val) => (!/\S/.test(val) ? null : 'Username should be one word'),
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
    form.values.username = '',
    form.values.confirmpassword = '',
    form.values.username = '',
    form.values.terms = false
  }

  //route user to login page
  const HandleLogin = (e : any) => {
    router.push('/auth/login')
  }

  //HandleCreate 
  const HandleCreate = async (e : any) => {
    const auth = useFirebaseAuth();
    console.log("register");
    if (ReadDocument("usernames", username) == undefined) {
        alert("Username exists")
        return undefined
    }
    var temp = 0  
    !/\s/.test(username) ? null : temp = 1
    if (temp == 1){
      alert("Username should be one word")
      return undefined
    }
    
    createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const UID = user?.uid;
      WriteUser({username: username, email: form.values.email, uid: UID, tables: []} as IUser)
      resetForm();
      console.log("VERIFIED (create account): " + auth.currentUser?.emailVerified)
      sendEmailVerification(user).then(() => {
        console.log("email sent")
        showNotification({
          title: 'Email Verification Sent!',
          message: 'An email has been sent to verify your email ',
          autoClose: 3000,
          color: 'green',
          icon: <IconCheck size={16} />,           
        })
        setTimeout(() => {
          router.push("/auth/verification");
          console.log("auth working")
        }, 3000)
        
      }).catch((error) => {
        console.log("email not sent")
        showNotification({
          title: 'Email Verification Error.',
          message: 'There was an error verifying your email. Please try again later.',
          autoClose: 3000,
          color: 'red',
          icon: <IconCheck size={16} />,           
        })
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        showNotification({
          title: 'Sorry, this email is already registered with NomNoms!',
          message: 'Please enter another email! ',
          autoClose: 3000,
          color: 'red',
          icon: <IconX size={16} />,           
        })
      }
      resetForm();
      console.log("auth working")
    });
  }

  const GetValue = () => {
    console.log("here")
    var myarray1= new Array("Appetizing", "Aromatic", "Bitter", "Bland", "Bold", "Buttery", "Candied", "Caramelized", "Chewy", "Citrusy", "Classic", "Comforting", "Crispy", "Crunchy", "Creamy", "Decadent", "Delectable", "Delicate", "Delicious", "Divine", "Earthy", "Exotic", "Fiery", "Flaky", "Flavorful", "Fresh", "Fruity", "Garlicky", "Gooey", "Grilled", "Hearty", "Heavenly", "Herbaceous", "Homemade", "Honeyed", "Hot", "Icy", "Indulgent", "Infused", "Intense", "Juicy", "Light", "Luscious", "Melt-in-your-mouth", "Mild", "Moist", "Mouthwatering", "Nutritious", "Robust", "Satiny", "Satisfying", "Succulent", "Aromatic", "Piquant", "Robust", "Succulent", "Tangy", "Tart", "Toothsome", "Velvety", "Vibrant", "Zesty", "Ambrosial", "Balsamic", "Buttery", "Candied", "Charred", "Chunky", "Citrusy", "Crispy", "Crumbly", "Crusty", "Delicious", "Delectable", "Divine", "Doughy", "Eggy", "Enchanting", "Enticing", "Exquisite", "Fiery", "Flaky", "Flavorful", "Fruity", "Gooey", "Hearty", "Heavenly", "Herbaceous", "Juicy", "Luscious", "Moist", "Mouthwatering", "Nutty", "Palatable", "Peppery", "Piquant", "Pungent", "Rich", "Robust", "Salty", "Satisfying", "Savory", "Scrumptious", "Seasoned", "Smoky", "Smooth", "Spicy", "Sticky", "Sublime", "Sweet", "Tangy", "Tart", "Tasty", "Tender", "Tingly", "Toasty", "Topped", "Toothsome", "Unctuous", "Unique", "Velvety", "Whipped", "Whole", "Wicked", "Woodsy", "Wondrous", "Yeasty", "Yummy", "Zesty", "Addictive", "Alluring", "Appetizing", "Bittersweet", "Bold", "Bright", "Captivating", "Classic", "Comforting", "Complex", "Crave-worthy", "Creamy", "Decadent", "Delightful", "Dynamic", "Earthy", "Elegant", "Exotic", "Familiar", "Festive", "Fresh", "Funky", "Seggsy")
    var myarray2= new Array("Lasagna", "Tacos", "Sushi", "Pizza", "Risotto", "Curry", "Gnocchi", "Ramen", "Falafel", "Dumplings", "Pesto", "Paella", "Carpaccio", "Fajitas", "Shakshuka", "Tartare", "Souffle", "Gumbo", "Ravioli", "Scampi", "Miso", "Gyro", "Boba", "Ratatouille", "Poutine", "Empanadas", "Bibimbap", "Tzatziki", "Haggis", "Nasi Goreng", "Biryani", "Polenta", "Chowder", "Kimchi", "Katsu", "Maki", "Soba", "Bratwurst", "Raclette", "Poke", "Cacciatore", "Moussaka", "Pho", "Escargot", "Gazpacho", "Bolognese", "Schnitzel", "Escabeche", "Feijoada", "Korma", "Meze", "Tempura", "Wonton", "Shakshuka", "Chakalaka", "Jambalaya", "Pastry", "Pierogi", "Frittata", "Ratatouille", "Croissant", "Shakshuka", "Shawarma", "Tagine", "Tostada", "Carpaccio", "Falafel", "Shakshuka", "Kebab", "Mezze", "Bibimbap", "Bulgogi", "Croquette", "Fajitas", "Miso", "Mousse", "Apple", "Banana", "Orange", "Pear", "Cherry", "Mango", "Pineapple", "Peach", "Plum", "Grapefruit", "Grapes", "Lemon", "Lime", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Kiwi", "Melon", "Watermelon", "Honeydew", "Cantaloupe", "Tomato", "Cucumber", "Carrot", "Broccoli", "Cauliflower", "Cabbage", "Spinach", "Kale", "Lettuce", "Celery", "Onion", "Garlic", "Potato", "Yam", "Squash", "Zucchini", "Mushroom", "Olive", "Peanut", "Cashew", "Almond", "Walnut", "Pecan", "Pistachio", "Hazelnut", "Macadamia", "Soybean", "Corn", "Wheat", "Rice", "Oat", "Barley", "Quinoa", "Couscous", "Bulgur", "Lentil", "Chickpea")
    var random = myarray1[Math.floor(Math.random() * myarray1.length)] + myarray2[Math.floor(Math.random() * myarray2.length)];
    setUsername(random);
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

    background: {

    }
  }));

  const { classes } = useStyles();

  //bg-gradient-to-r mt-5 from-rose-50 via-white to-rose-50

  return (
    <form onSubmit={form.onSubmit(HandleCreate)}>

    <Paper className={`${classes.background}`} p="xl" withBorder {...props}  >
    <NotificationsProvider>
      <Container size={500} 
          className="bg-gradient-to-r mt-5 from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
          <Title className= {classes.title} align = "center">
              Not a Nomster yet?
          </Title>

          <Text color="dimmed" size="sm" align="center">
              Create an account below!
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

          <TextInput
           required
           label="Username"
           placeholder="SpicyBurrito"
           rightSection={
            <Tooltip 
            label="Randomize"
            onClick={GetValue}
            position="top-end" withArrow>
              <div>
                <IconRefresh size="1rem" style={{ display: 'block', opacity: 0.5 }} />
              </div>
            </Tooltip>
          }
          value={username}
          onChange={(event) => setUsername(event.target.value)}
           //error={form.errors.username && 'Username should be one word'}
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
          >Register</Button>

        </Group>


        <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <GithubButton radius="xl">GitHub</GithubButton>
          </Group>
          <Text size="sm" weight={200} align="center">
        By creating an account, you agree to our <Anchor href="https://mantine.dev/" target="_blank">
          Terms of Service and Private Policy </Anchor>
      </Text> 
        </Container>


    </NotificationsProvider>
    </Paper>

    </form>

  );
}
