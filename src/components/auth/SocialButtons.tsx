import { Button, ButtonProps, Group } from '@mantine/core';
import { GithubIcon, DiscordIcon, TwitterIcon } from '@mantine/ds';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';
import { CreateAccountWithFacebook, CreateAccountWithGoogle } from '@/pages/auth/createAccount';
import { signInAnonymously, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';

const provider = new GoogleAuthProvider();

const handleGoogle = async (e: any) => {
  console.log("checking google")
  const auth = useFirebaseAuth();
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

const facebookprovider = new FacebookAuthProvider();

    const handleFacebook = async (e: any) => {
      console.log("checking facebook")
      const auth = useFirebaseAuth();
  signInWithPopup(auth, facebookprovider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
    }

import { signInAnonymously, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';

const provider = new GoogleAuthProvider();

const HandleGoogle = async (e: any) => {
  console.log("checking google")
  const auth = useFirebaseAuth();
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

const facebookprovider = new FacebookAuthProvider();

    const HandleFacebook = async (e: any) => {
      console.log("checking facebook")
      const auth = useFirebaseAuth();
  signInWithPopup(auth, facebookprovider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    console.log("working facebook");

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log(errorMessage);

    // ...
  });
    }


export function GoogleButton(props: ButtonProps) {
  return (<Button onClick= {handleGoogle} leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />);
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      onClick={handleFacebook}
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#fff',
        color: '#4267B2',
        borderColor: theme.fn.lighten('gray', 0.82),
        '&:hover': {
          backgroundColor: theme.fn.darken('#fff', 0.03),
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