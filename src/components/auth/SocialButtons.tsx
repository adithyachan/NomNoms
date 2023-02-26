import { Button, ButtonProps, Group } from '@mantine/core';
import { GithubIcon, DiscordIcon, TwitterIcon } from '@mantine/ds';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';
import { CreateAccountWithFacebook, CreateAccountWithGoogle } from '@/pages/auth/createAccount';
import { signInAnonymously, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';


export function GoogleButton(props: ButtonProps) {
  return <Button onClick= {CreateAccountWithGoogle} leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      onClick={CreateAccountWithFacebook}
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#fff',
        color: '#4267B2',
        '&:hover': {
          backgroundColor: theme.fn.darken('#fff', 0.1),
        },
      })}
      {...props}
    />
  );
  
}

export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<DiscordIcon size={16} />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#5865F2', 0.05),
        },
      })}
      {...props}
    />
  );
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Button
      component="a"
      leftIcon={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}

export function GithubButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      leftIcon={<GithubIcon size={16} />}
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  );
}

export function SocialButtons() {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <GoogleButton>Continue with Google</GoogleButton>
      <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton>
      <FacebookButton>Sign in with Facebook</FacebookButton>
      <GithubButton>Login with GitHub</GithubButton>
      <DiscordButton>Join Discord community</DiscordButton>
    </Group>
  );
}