import { Flex, Image, Loader, Text, Button } from "@mantine/core"
import { useState, useEffect} from 'react';
import { sendEmailVerification } from "firebase/auth";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";

export default function LoadingMainLogo(props: {verification?: boolean}) {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [time, setTime] = useState(60)
  const [timeActive, setTimeActive] = useState(true) 

  useEffect(() => {
    let interval = null as any
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time])

  const auth = useFirebaseAuth()
  const resendEmailVerification = () => {
    setButtonDisabled(true)
    setTimeActive(true)
    sendEmailVerification(auth.currentUser!)
    .then(() => {
      setButtonDisabled(false)
      setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
      setButtonDisabled(false)
    })
  }

  return (
    <Flex justify="center"
    align="center"
    direction="column">
      <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo"/>
      {props.verification ? 
      <>
      <Text 
        className=" text-6xl tracking-normal leading-normal font-black" 
        variant="gradient" 
        gradient={{from: "red.7", to: "red.4"}}>
          Awaiting Email Verification
      </Text> 
      <Text 
      className="mb-10 text-mb tracking-normal leading-normal font-black text-rose-600" >
        Please check your inbox to verify your email!
      </Text> 
      <Button 
      className="mb-10"
      component = "a"
      variant="filled"
      color="red"
      onClick={resendEmailVerification}
      disabled={timeActive}
      >Resend Email {timeActive && time}
      </Button>
      </>
      : 
      <></>
      } 
        <Loader className="align-baseline" color="red" size={120} variant="dots" />

    </Flex>
  )
}