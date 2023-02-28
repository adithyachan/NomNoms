import { Box, 
  Progress, 
  PasswordInput, 
  Group, 
  Text, 
  Center, 
  Container,
  Image,
  Paper,
  Title,
  createStyles,
  Button,
  Space
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons';
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { confirmPasswordReset } from "firebase/auth";
import { useEffect, useRef, useState } from 'react';
import { Router, useRouter } from "next/router";
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';


function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export default function ResetPassword() {
    const { classes } =  useStyles();
    const [value, setValue] = useInputState('');
    const strength = getStrength(value);
    const checks = requirements.map((requirement, index) => (
      <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));
    
    const bars = Array(4)
      .fill(0)
      .map((_, index) => (
        <Progress
          styles={{ bar: { transitionDuration: '0ms' } }}
          value={
            value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
          }
          color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
          key={index}
          size={4}
        />
      ));
      
      const oobCode = useRef<null | string>(null);
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(true);
      
      useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        oobCode.current = queryParams.get("oobCode");
        if (!oobCode.current) {
          router.push("/auth/login")
        }
      })



      const HandleReset = async (e : any) => {
        e.preventDefault();
        const auth = useFirebaseAuth();
        const queryParams = new URLSearchParams(window.location.search)
        oobCode.current = queryParams.get("oobCode");
        if (oobCode.current) {
          confirmPasswordReset(auth, oobCode.current, value).then(() => {
            showNotification({
              title: 'Password Successfully Changed!',
              message: 'Redirecting to login page',
              autoClose: 3000,
              color: 'teal',
              icon: <IconCheck size={16} />,
              styles: () => ({
                /*
                root: {
                  backgroundColor: '#FFE4E6',
                  borderColor: '#FFE4E6',
                  '&::before': { backgroundColor: '#FFFFFF' },
                },
                */
                //title: { color: '#F43F5E' },
                //description: { color: '#F43F5E'},
                closeButton: {
                  color: '#F43F5E',
                  '&:hover': { backgroundColor: '#F43F5E' },
                },
              }),            
            })
            setTimeout(() => {
              router.push('/auth/login');
            }, 3000)

          }).catch(e => {
            console.log("error")
          });
        }
        setValue("");
        e.target.reset();
      }
    return (
        <form onSubmit={HandleReset}>
        <NotificationsProvider>
        <Container size={460} my={30} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
          <Title className={classes.title} align="center">
                Forgot your password?
              </Title>
              <Text color="dimmed" size="sm" align="center">
                Enter a new password
              </Text>
          <Paper withBorder shadow="md" p={25} radius="md" mt="xl" className='bg-rose-200'> 
            <div>
              <PasswordInput
                value={value}
                onChange={setValue}
                placeholder="Your password"
                label="Password"
                required
              />
              <Group spacing={5} grow mt="xs" mb="md">
                {bars}
              </Group>
        
              <PasswordRequirement label="Has at least 6 characters" meets={value.length > 5} />
              {checks}
            </div>
            <Space h="md"></Space>
            <Group position='center' spacing="xl">
              <Button 
                className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
                disabled={!(strength > 80)} 
                type="submit"
                >Reset password
              </Button>
            </Group>
          </Paper>
        </Container>
        </NotificationsProvider>
        </form>
    );
}