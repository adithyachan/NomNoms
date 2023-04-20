/* TODO: Layout for Reset Password Page */
import {
    createStyles,
    Paper,
    Title,
    Text,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Image,
    HoverCard,
    Modal,
    FileInput,
    Avatar,
    Grid,
    Flex,
    ScrollArea,
    Box,
  } from '@mantine/core';

import React, {useEffect, useState } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { ReadUser, WriteUser } from "@/lib/firebase/auth/AuthOperations";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject  } from "firebase/storage";
import firebase from "firebase/compat";
import ReadPic from "@/components/ReadProfilePic";
import { updateProfile } from "firebase/auth";
import { useUser } from "@/providers/AuthProvider";
import NavBar from '@/components/NavBar';

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

  export default function ProfilePictureLayout() {
  
    const [opened, setOpen] = useState(false);
    const { classes } = useStyles();
    const [imageResult,setImageResult] =useState<string | ArrayBuffer | null>()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [thereIsFile,setFile] = useState(false) 
    const [isImage, setIsImage] = useState(false);
    const [avatarURL, setAvatarURL] =  useState<string>("");
    //const [url,setUrl] = useState("")
    const { user } = useUser();
    const auth = useFirebaseAuth()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
    if (!avatarURL) {
        setAvatarURL(user?.photoURL!)
      } 
      else {
        setAvatarURL("")
        
      }
    }, [user])
    
    const handleFileInputChange = async (file: File | null) => {
        setLoading(true)
        if (file != null) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const { result } = reader;
            //setImageResult(result)
           
            const isImage = (result as string).startsWith("data:image/");
            setIsImage(isImage);
            if (isImage) {
              setSelectedFile(file);
              setSelectedImage(null)
              if (user == undefined) {
               return
              }

              const storage = getStorage();
              const storageRef = ref(storage, `profilePictures/${user.uid}`);
              await uploadString(storageRef, result as string, "data_url");
              setImageResult(await getDownloadURL(storageRef))
              setLoading(false)
            }
          };
          reader.readAsDataURL(file);
          
        }
    };

    const handleUploadButtonClick = async () => {
      setLoading(true)
      setOpen(false);
      //setAvatarPicture(<Avatar radius="xl" size="xl" src={imageResult as string} />)
      await updateProfile(user, {
        photoURL: imageResult as string
      })
      setAvatarURL(imageResult as string)
      setSelectedFile(null)
      setFile(false)
      setSelectedImage(null)
    }

    const handleImageClick = async(picSrc: string) => {
      setSelectedFile(null)
      const storage = getStorage();
              const storageRef = ref(storage, `profilePictures/${user.uid}`);
              const response = await fetch(picSrc);
              const blob = await response.blob();
              const dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              });
              await uploadString(storageRef, dataUrl as string , "data_url");
              setImageResult(await getDownloadURL(storageRef))
              setLoading(false)
              setFile(true)
              setIsImage(true)
              setSelectedImage(picSrc);

    } 
    

   const handleRemovePhoto = async () => {
    setSelectedImage(null)
    setOpen(false)
    const storage = getStorage();
    await updateProfile(user, {
      photoURL: ""
    })
    setAvatarURL("")
    if (user == undefined) {
      return
     }
    const pictureRef = ref(storage,  `profilePictures/${user.uid}`);
    await deleteObject(pictureRef);
    

    
   }

   return (
    <>
    <NavBar>
    </NavBar>
<Container fluid className="bg-gradient-to-b from-rose-100 to-white">

<Grid>
    <Grid.Col span={12} md={12}>

    <NotificationsProvider>
      <Modal
             radius = "lg"
             centered
             withCloseButton={false} 
             size="auto"
             opened={opened}
             onClose={() => ((setOpen(false)),setSelectedFile(null),setFile(false),setSelectedImage(null),setLoading(true))}
             overlayOpacity={0.55}
             overlayBlur={3} 
             overflow="inside" 
             style = {{ position : "absolute", top:'7%'
             } } >
              
              <ScrollArea type="always" h = {130} w={300} style={{ display: 'flex', flexDirection: 'row',overflowX: "auto" }}>
                <Flex   justify="center"
      align="center"
      direction="row">
              <Image src="/images/boba.png" style={{border: selectedImage === '/images/boba.png' ? '4px solid pink' : 'none' , width: '110px', height: '110px', display: 'inline-block', cursor:"pointer"}}  onClick = {() => handleImageClick("/images/boba.png")}/> 
              <Image src="/images/cake.png" style={{border: selectedImage === '/images/cake.png' ? '4px solid pink' : 'none',width: '110px', height: '110px', display: 'inline-block', cursor:"pointer"}}  onClick = {() => handleImageClick("/images/cake.png")}/>  
              <Image src="/images/burger.png" style={{border: selectedImage === '/images/burger.png' ? '4px solid pink' : 'none', width: '110px', height: '110px', display: 'inline-block', cursor:"pointer"}} onClick = {() => handleImageClick("/images/burger.png")}/>  

              <Image src="/images/fries.png" style={{border: selectedImage === '/images/fries.png' ? '4px solid pink' : 'none',width: '110px', height: '110px', display: 'inline-block', cursor:"pointer"}}  onClick = {() => handleImageClick("/images/fries.png")}/> 
              <Image src="/images/sushi.png" style={{border: selectedImage === '/images/sushi.png' ? '4px solid pink' : 'none', width: '110px', height: '110px', display: 'inline-block', cursor:"pointer"}}  onClick = {() => handleImageClick("/images/sushi.png")}/> 
              <Image src="/images/taco.png" style={{border: selectedImage === '/images/taco.png' ? '4px solid pink' : 'none', width: '110px', height: '110px', display: 'inline-block', cursor:"pointer"}}   onClick = {() => handleImageClick("/images/taco.png")}/>  
              </Flex>
              </ScrollArea>
              <FileInput
              
        accept="image/*"
        label="Select a profile picture"
        onChange={ handleFileInputChange}
        value={selectedFile}
        styles={{ root: { marginBottom: "16px" } }}
      />
      {!isImage && (
        <Text color="red">Please select an image file</Text>
      )}
      
      < Group style ={{padding:'xl'}}>
      { !loading &&((selectedFile && isImage) || (isImage && thereIsFile)) && (
        <Button
          variant="outline"
          onClick={handleUploadButtonClick}
        >
          Upload
        </Button>) }
      {
        avatarURL!= "" && avatarURL!=undefined &&
      <Button
         variant="outline" 
         onClick={handleRemovePhoto}
       >
         Remove Photo
       </Button> }
      </Group>

      
     
      {!selectedFile && (
        <Text color="gray">No file selected</Text>
      )}
             
        </Modal> 
        <Container size={460} my={30} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Center className="flex-col">
            <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
            
            <Title className={classes.title} align="center">
                Change Your Profile Picture
            </Title>

            {/* <div>
            
              <img src={user?.photoURL as string} />
            </div> */}
            
            <Text color="dimmed" size="sm" align="center">
              Want to change your profile picture? Select a preset icon or upload your own photo!
            </Text>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className='bg-rose-200'>
            
              <Group position="apart"  className={classes.controls}>
              <Avatar size="xl" radius="xl" src={avatarURL} />
                <Anchor color="red" size="sm" className={classes.control}>
                  <Center inline>
                  <Button 
                    className={`bg-rose-500 hover:bg-rose-600 ${classes.control}`} 
                    type="submit"
                    onClick={() => setOpen(true)}
                    >Change Profile Picture
                    </Button>
                  </Center>
                </Anchor>

                <HoverCard width={280} shadow="md">
              
            
                </HoverCard>
              

              </Group>
            </Paper>
          </Center>
        </Container>     
      </NotificationsProvider>
    </Grid.Col>
</Grid>   
</Container>
</>
    )
  }
