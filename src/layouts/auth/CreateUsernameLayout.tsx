import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
// import { CreateAccountEmailandPassword } from '@/lib/firebase/auth/AuthService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
import { GoogleButton, TwitterButton, FacebookButton} from "@/components/auth/SocialButtons"
import { formatDiagnostic } from 'typescript';
import { randomFill } from 'crypto';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AuthenticationForm(props: PaperProps) {
  //const [type, toggle] = useToggle(['NomNom!']);
  const [username, setUsername] = useState("");
  const router = useRouter();
  //disable the button if the inputs are not valid
    const HandleCreate = async (e : any) => {
      e.preventDefault();
      console.log("working")
      console.log("working")
      console.log(username)
      setTimeout(() => {
        router.push('/tables');
      }, 10)
    }
    

    const GetValue = () => {
      console.log("here")
      var myarray1= new Array("Appetizing", "Aromatic", "Bitter", "Bland", "Bold", "Buttery", "Candied", "Caramelized", "Chewy", "Citrusy", "Classic", "Comforting", "Crispy", "Crunchy", "Creamy", "Decadent", "Delectable", "Delicate", "Delicious", "Divine", "Earthy", "Exotic", "Fiery", "Flaky", "Flavorful", "Fresh", "Fruity", "Garlicky", "Gooey", "Grilled", "Hearty", "Heavenly", "Herbaceous", "Homemade", "Honeyed", "Hot", "Icy", "Indulgent", "Infused", "Intense", "Juicy", "Light", "Luscious", "Melt-in-your-mouth", "Mild", "Moist", "Mouthwatering", "Nutritious", "Robust", "Satiny", "Satisfying", "Succulent", "Aromatic", "Piquant", "Robust", "Succulent", "Tangy", "Tart", "Toothsome", "Velvety", "Vibrant", "Zesty", "Ambrosial", "Balsamic", "Buttery", "Candied", "Charred", "Chunky", "Citrusy", "Crispy", "Crumbly", "Crusty", "Delicious", "Delectable", "Divine", "Doughy", "Eggy", "Enchanting", "Enticing", "Exquisite", "Fiery", "Flaky", "Flavorful", "Fruity", "Gooey", "Hearty", "Heavenly", "Herbaceous", "Juicy", "Luscious", "Moist", "Mouthwatering", "Nutty", "Palatable", "Peppery", "Piquant", "Pungent", "Rich", "Robust", "Salty", "Satisfying", "Savory", "Scrumptious", "Seasoned", "Smoky", "Smooth", "Spicy", "Sticky", "Sublime", "Sweet", "Tangy", "Tart", "Tasty", "Tender", "Tingly", "Toasty", "Topped", "Toothsome", "Unctuous", "Unique", "Velvety", "Whipped", "Whole", "Wicked", "Woodsy", "Wondrous", "Yeasty", "Yummy", "Zesty", "Addictive", "Alluring", "Appetizing", "Bittersweet", "Bold", "Bright", "Captivating", "Classic", "Comforting", "Complex", "Crave-worthy", "Creamy", "Decadent", "Delightful", "Dynamic", "Earthy", "Elegant", "Exotic", "Familiar", "Festive", "Fresh", "Funky", "Seggsy")
      var myarray2= new Array("Lasagna", "Tacos", "Sushi", "Pizza", "Risotto", "Curry", "Gnocchi", "Ramen", "Falafel", "Dumplings", "Pesto", "Paella", "Carpaccio", "Fajitas", "Shakshuka", "Tartare", "Souffle", "Gumbo", "Ravioli", "Scampi", "Miso", "Gyro", "Boba", "Ratatouille", "Poutine", "Empanadas", "Bibimbap", "Tzatziki", "Haggis", "Nasi Goreng", "Biryani", "Polenta", "Chowder", "Kimchi", "Katsu", "Maki", "Soba", "Bratwurst", "Raclette", "Poke", "Cacciatore", "Moussaka", "Pho", "Escargot", "Gazpacho", "Bolognese", "Schnitzel", "Escabeche", "Feijoada", "Korma", "Meze", "Tempura", "Wonton", "Shakshuka", "Chakalaka", "Jambalaya", "Pastry", "Pierogi", "Frittata", "Ratatouille", "Croissant", "Shakshuka", "Shawarma", "Tagine", "Tostada", "Carpaccio", "Falafel", "Shakshuka", "Kebab", "Mezze", "Bibimbap", "Bulgogi", "Croquette", "Fajitas", "Miso", "Mousse", "Apple", "Banana", "Orange", "Pear", "Cherry", "Mango", "Pineapple", "Peach", "Plum", "Grapefruit", "Grapes", "Lemon", "Lime", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Kiwi", "Melon", "Watermelon", "Honeydew", "Cantaloupe", "Tomato", "Cucumber", "Carrot", "Broccoli", "Cauliflower", "Cabbage", "Spinach", "Kale", "Lettuce", "Celery", "Onion", "Garlic", "Potato", "Yam", "Squash", "Zucchini", "Mushroom", "Olive", "Peanut", "Cashew", "Almond", "Walnut", "Pecan", "Pistachio", "Hazelnut", "Macadamia", "Soybean", "Corn", "Wheat", "Rice", "Oat", "Barley", "Quinoa", "Couscous", "Bulgur", "Lentil", "Chickpea")
      var random = myarray1[Math.floor(Math.random() * myarray1.length)] + myarray2[Math.floor(Math.random() * myarray2.length)];
      setUsername(random);
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
    
     <form onSubmit={(HandleCreate)}>

      <Container size={500} my={50} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
         
          <Text color="dimmed" size="xs" align="center" >
              Enter username below or use the randomize button!
            </Text>
        
         <TextInput
           required
           label="Username"
           placeholder="SpicyBurrito"
           value={username}
           onChange={(event) => setUsername(event.target.value)}
           //error={form.errors.email && 'Invalid email'}
         />

        <Stack>
    

      
        </Stack>

        


        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="submit"
            color="pink"
            //onClick={() => handleCreate}
            size="xs"
          >
      
          </Anchor>

          <Button  
          className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} type="submit"  >NomNom!</Button>
        </Group>

        <Anchor
            component="button"
            color="pink"
            //onClick={() => console.log('here')}
            size="xs"
          >
      
          </Anchor>
          <Button onClick={GetValue}
          className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`}>Randomize</Button>
        </Container>
      </form>
    
    </Paper>
   
  );
}



