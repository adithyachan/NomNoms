import Loading from "@/components/loaders/Loading";
import LoadingMainLogo from "@/components/loaders/LoadingMainLogo";
import { Center, Button } from "@mantine/core";

export default function LoadingLayout(props: {fullscreen?: boolean, logo?: boolean, verification?: boolean}) {
  return(
    <Center className={props.fullscreen ? "min-h-screen" : "min-h-full"}>
      {props.logo 
      ? 
      <>
      <LoadingMainLogo verification={props.verification}/> 
      </>
      : 
      <Loading />
      }
    </Center>
    
  );
}