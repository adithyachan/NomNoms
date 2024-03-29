import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    Image,
  } from '@mantine/core';
  import { IconArrowLeft, IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import React from 'react';
import { useForm } from 'react-hook-form'
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';

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
  
  export default function ForgotPassword() {
    const { handleSubmit, register, getValues, formState: {isValid, errors}, reset } = useForm(
    { mode: 'onChange', defaultValues: {email: ''}});


    const router = useRouter();
    const [isError, setError] = useState(Boolean);

    const HandleReset = async (e : any) => {
      e.preventDefault();
      console.log(getValues('email'));
      const email = getValues('email'); 
      const auth = useFirebaseAuth();
        sendPasswordResetEmail(auth, email).then(() => {
        setError(false);
        showNotification({
          title: 'Check your inbox!',
          message: 'An email to reset your password has been sent.',
          autoClose: 3000,
          color: 'teal',
          icon: <IconCheck size={16} />,
          
          styles: () => ({
            closeButton: {
              color: '#F43F5E',
              '&:hover': { backgroundColor: '#F43F5E' },
            },
          }),            
        })
      }).catch(error => {
        setError(true)
        console.clear();
        showNotification({
          title: 'Error!',
          message: 'An error occured while sending an email.',
          autoClose: 3000,
          color: 'red',
          icon: <IconX size={16} />,
          
          styles: () => ({
            closeButton: {
              color: '#F43F5E',
              '&:hover': { backgroundColor: '#F43F5E' },
            },
          }),            
        })
      });
      reset({email: ''});
      e.target.reset();
    };

    const HandleReturn = (e : any) => {
      router.push('/auth/login')
    }

    const { classes } = useStyles();

    return (
      <form onSubmit={HandleReset}>
        <NotificationsProvider>
        <Container size={460} my={30} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Center className="flex-col">
            <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
            <Title className={classes.title} align="center">
              Forgot your password?
            </Title>
            <Text color="dimmed" size="sm" align="center">
              Enter your email to get a reset link
            </Text>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className='bg-rose-200'>

            <TextInput  
            label="Your email" 
            placeholder="nomnoms@gmail.com" 
            classNames={errors?.email?.type == 'pattern' || errors?.email?.type == 'required' ? { input: classes.invalid } : {}}
            rightSection={errors?.email?.type == 'pattern' || errors?.email?.type == 'required' ? <IconAlertTriangle stroke={1.5} size={16} className={classes.icon} /> : <></>}
            error={errors?.email?.type == 'pattern' || errors?.email?.type == 'required' ? "Invalid email" : ""}  
            {...register("email", 
            { required: true, 
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i 
            })}
            />
              <Group position="apart" mt="lg" className={classes.controls}>
                <Anchor color="red" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft color='#F43F5E' size={12} stroke={1.5} />
                    <Box onClick={HandleReturn} ml={5}>
                      <Text color='#F43F5E'>
                        Back to login page
                      </Text>
                    </Box>
                  </Center>
                </Anchor>

                <Button 
                className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
                disabled={!isValid} 
                type="submit"
                
                >Reset password
                </Button>
              </Group>
            </Paper>
          </Center>
        </Container>     
      </NotificationsProvider>
      </form>
    );
  }