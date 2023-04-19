import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';
import { Text, Image, Flex, Center} from '@mantine/core'
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { applyActionCode } from "firebase/auth";

export default function EmailVerifiedLayout(props : {oobCode : any}) {
    const oobCode = useRef<null | string>(null);
    const router = useRouter();
    const [error, setError] = useState(false);
    const auth = useFirebaseAuth()
    const [first, setFirst] = useState(true)
    
    useEffect(() => {
      if (first) {
        if (!oobCode) {
          setError(true)
          router.push('/')
        } else {
          applyActionCode(auth, props.oobCode).then(() => {
          }).catch((error) => {

          })  
        }
        setFirst(false)
      }
    })


    return (
        <div>
        {error ?
        <></>
        :
        <Center className="min-h-screen">
            <Flex 
            justify="center"
              align="center"
              direction="column"
              >
        <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo"/>
        <Text 
          className=" text-6xl tracking-normal leading-normal font-black" 
          variant="gradient" 
          gradient={{from: "red.7", to: "red.4"}}>
            Your email has been verified! 
        </Text> 
        <Text 
        className="mb-10 text-mb tracking-normal leading-normal font-black text-rose-600" >
          You may now sign into your account.
        </Text>
        </Flex>
        </Center> 
        }
        </div>
    );
}