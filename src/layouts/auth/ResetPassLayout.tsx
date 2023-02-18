/* TODO: Layout for Reset Password Page */
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
  import { IconArrowLeft } from '@tabler/icons';
  import EnterEmail from "@/components/auth/EnterEmail"
import { useEffect } from 'react';
import { EmailAuthCredential } from 'firebase/auth';
import { IconAlertTriangle } from '@tabler/icons';
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { Alert } from "@mantine/core";
import { sendPasswordResetEmail } from "firebase/auth";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import React from 'react';
import { useForm } from '@mantine/form';

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
    
    const [email, updateEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleReset = async (e : any) => {
          console.log("hello") 
          e.preventDefault();
          console.log(email);         
          /*

          const auth = useFirebaseAuth();
          //fix edge cases  
          sendPasswordResetEmail(auth, email).then(() => {
            router.push('/auth/inputresetpass')
          }).catch(error => {
              setError(error.message);
          });
          */
    };
  

    const { classes } = useStyles();

    return (
    <Container size={460} my={30}>
        <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleReset}>
        <TextInput label="Your email" placeholder="me@mantine.dev" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control} type="submit" >Reset password</Button>
          </Group>
        </form>
        </Paper>
      </Container>
    );
  }