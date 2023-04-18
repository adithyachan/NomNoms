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
    const [isImage, setIsImage] = useState(false);
    const [avatarURL, setAvatarURL] =  useState<string>("");
    //const [url,setUrl] = useState("")
    const { user } = useUser();
    
    useEffect(() => {
      if (!avatarURL) {
        setAvatarURL(user?.photoURL!)
      }
    }, [user])
    
    const handleFileInputChange = (file: File | null) => {
        if (file != null) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const { result } = reader;
            //setImageResult(result)
           
            const isImage = (result as string).startsWith("data:image/");
            setIsImage(isImage);
            if (isImage) {
              setSelectedFile(file);
              if (user == undefined) {
               return
              }
              const storage = getStorage();
              const storageRef = ref(storage, `profilePictures/${user.uid}`);
              await uploadString(storageRef, result as string, "data_url");
              setImageResult(await getDownloadURL(storageRef))
            }
          };
          reader.readAsDataURL(file);
        }
    };

    const handleUploadButtonClick = async () => {
      setOpen(false);
      //setAvatarPicture(<Avatar radius="xl" size="xl" src={imageResult as string} />)
      await updateProfile(user, {
        photoURL: imageResult as string
      })

      setAvatarURL(imageResult as string)
    }

   const handleRemovePhoto = async () => {
    setOpen(false)
    setAvatarURL("")
    // const storage = getStorage();
    // if (user == undefined) {
    //   return
    //  }
    // const pictureRef = ref(storage,  `profilePictures/${user.uid}`);
    // await deleteObject(pictureRef);
   }

   return (
   
    <NotificationsProvider>
      <Modal
             radius = "lg"
             centered
             withCloseButton={false} 
             size="auto"
             opened={opened}
             onClose={() => setOpen(false)}
             overlayOpacity={0.55}
             overlayBlur={3} 
             overflow="inside" 
             style = {{ position : "absolute", top:'7%'
             } } >
             <FileInput
        accept="image/*"
        label="Select a profile picture"
        onChange={handleFileInputChange}
        value={selectedFile}
        styles={{ root: { marginBottom: "16px" } }}
      />
      {!isImage && (
        <Text color="red">Please select an image file</Text>
      )}
      
      {selectedFile && isImage && (< Group style ={{padding:'xl'}}>

        <Button
          variant="outline"
          onClick={handleUploadButtonClick}
        >
          Upload
        </Button> 
        
         <Button
         variant="outline" 
         onClick={handleRemovePhoto}
       >
         Remove Photo
       </Button>
       </Group>
      )}

      
     
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
    )
  }
