import { Button, ButtonProps, Group } from '@mantine/core';
import { IconBrandGithub, IconBrandDiscord, IconBrandTwitter } from '@tabler/icons-react';
import { GoogleIcon } from './GoogleIcon';
import {  signInWithPopup, GoogleAuthProvider, GithubAuthProvider,linkWithPopup } from "firebase/auth";
import { useFirebaseAuth } from '@/lib/firebase/hooks/useFirebase';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { ReadUsers } from '@/lib/firebase/auth/AuthOperations';
import { useUser } from '@/providers/AuthProvider';
//const provider = new GoogleAuthProvider();

const provider = new GoogleAuthProvider();
const Gprovider = new GithubAuthProvider();

export function GoogleButton(props: ButtonProps) {
  const [users, setUsers] =  useState<User[]>();
  const router = useRouter();
  useEffect(() => {
    if (users?.length == 0 || users == undefined) {
      const unsub = ReadUsers(setUsers)
      return unsub;
    }
  })
  const HandleGoogle = async (e: any) => {
    const auth = useFirebaseAuth();
    signInWithPopup(auth, provider).then((result) => {
    const username = users?.find((item) => item.uid == auth.currentUser?.uid)?.username!
    
    if (!username) {
      console.log("USERNAME" + username)
      setTimeout(() => {
        router.push('/auth/createUsername');
      }, 10)
    } else {
      console.log("USERNAME" + username)
      setTimeout(() => {
        router.push('/tables');
      }, 10)
    }
  }).catch((error) => {
    console.log(error)
  });   
  }
  return (<Button onClick= {HandleGoogle} leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />);
}

export function GoogleButtonLogin(props: ButtonProps) {
  const [users, setUsers] =  useState<User[]>();
  const router = useRouter();
  useEffect(() => {
    if (users?.length == 0 || users == undefined) {
      const unsub = ReadUsers(setUsers)
      return unsub;
    }
  })

  const HandleGoogleLogin = async (e: any) => {
    console.log("checking google")
    const auth = useFirebaseAuth();
    signInWithPopup(auth, provider).then((result) => {
    const username = users?.find((item) => item.uid == auth.currentUser?.uid)?.username!
    console.log("USERNAME" + username)
    if (!username) {
      setTimeout(() => {
        router.push('/auth/createUsername');
      }, 10)
    } else {
      setTimeout(() => {
        router.push('/tables');
      }, 10)
    }
  }).catch((error) => {
    console.log(error)
  });   
  }
  return (<Button onClick= {HandleGoogleLogin} leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />);
}

export function GoogleButtonLink(props: ButtonProps) {
  const router = useRouter();
  

  const HandleGoogleLink = async (e: any) => {
    console.log("checking google")
    const auth = useFirebaseAuth();
    if (auth.currentUser == null) {
      return undefined
    }
    console.log("here now")
    linkWithPopup(auth.currentUser, provider).then((result) => {
      // Accounts successfully linked.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // ...
    });   

  }
  return (<Button onClick= {HandleGoogleLink} leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />);
}


export function GithubButton(props: ButtonProps) {
  const router = useRouter();
  const HandleGithub = async (e: any) => {
	const auth = useFirebaseAuth();
 signInWithPopup(auth, Gprovider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    setTimeout(() => {
      router.push('/auth/createUsername');
    }, 10)
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
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <Button
      {...props}
      onClick={HandleGithub}
      leftIcon={<IconBrandGithub size={16} />}
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

export function GithubButtonLogin(props: ButtonProps) {
  const router = useRouter();
  const HandleGithubLogin = async (e: any) => {
	const auth = useFirebaseAuth();
 signInWithPopup(auth, Gprovider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    setTimeout(() => {
      router.push('/tables');
    }, 10)
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
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <Button
      {...props}
      onClick={HandleGithubLogin}
      leftIcon={<IconBrandGithub size={16} />}
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

export function GithubButtonLink(props: ButtonProps) {
  const router = useRouter();
  const HandleGithubLink = async (e: any) => {
	const auth = useFirebaseAuth();
  if (auth.currentUser == null) {
    return undefined
  }
  console.log("here now")
  linkWithPopup(auth.currentUser, Gprovider).then((result) => {
    // Accounts successfully linked.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // ...
  });   
  }
  return (
    <Button
      {...props}
      onClick={HandleGithubLink}
      leftIcon={<IconBrandGithub size={16} />}
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
      <GithubButton>Login with GitHub</GithubButton>
      <DiscordButton>Join Discord community</DiscordButton>
    </Group>
  );
}


export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<IconBrandDiscord size={16} />}
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
      leftIcon={<IconBrandTwitter size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}