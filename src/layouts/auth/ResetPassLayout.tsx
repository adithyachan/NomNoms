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
  
  export default function ForgotPassword(props : {updateEmail : any}) {
    const { classes } = useStyles();
  
    const updateEmail = props.updateEmail;
    const valid = false;

    useEffect(() => {
      updateEmail(valid)
    }, [updateEmail, valid])

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
        <TextInput
        label="Your email" 
        placeholder="nomnoms@gmail.com" 
        error={valid}
        defaultValue=""
        classNames={valid ? { input: classes.invalid } : {}}
        rightSection={valid ? <IconAlertTriangle stroke={1.5} size={16} className={classes.icon} /> : <></>}
        onChange={(e) => updateEmail(e.target.value)}
        />
      
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }