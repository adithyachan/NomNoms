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
    Box,
    Image,
    HoverCard,
    Modal,
    FileInput,
    Avatar,
    Flex,
    SegmentedControl,
  } from '@mantine/core';
  import { IconArrowLeft, IconCheck, IconUserCircle, IconX } from '@tabler/icons-react';
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';




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
    const [value, setValue] = useState<File | null>(null);
    const [opened, setOpen] = useState(false);
    const { classes } = useStyles();
    const [imageResult,setImageResult] =useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isImage, setIsImage] = useState(false);
    const [AvatarPicture,setAvatarPicture] =  useState(<Avatar radius="xl" size="xl" src={null} /> );
    const router = useRouter();


    const handleFileInputChange = (file: File | null) => {
        if (file != null) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const { result } = reader;
            setImageResult(result as string)
            const isImage = (result as string).startsWith("data:image/");
            setIsImage(isImage);
    

            if (isImage) {
              setSelectedFile(file);
            //   setImage(URL.createObjectURL(file));
            }
          };
          reader.readAsDataURL(file);
        }
      };
    
   const handleUploadButtonClick = () => {
    setOpen(false);
    setAvatarPicture(<Avatar radius="xl" size="xl" src={imageResult as string} />)

   };

   const handleRemovePhoto = () => {
    setOpen(false);
    setAvatarPicture(<Avatar radius="xl" size="xl" src={null} />)
   }

   return (
   
    <NotificationsProvider>
        <Container size={460} my={30} 
          className="mt-40 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-10 rounded-xl shadow-rose-200 shadow-lg transition ease-in-out duration-300 hover:shadow-2xl hover:shadow-rose-300">
          <Center className="flex-col">
            <Image width={400} src="/images/full_logo.png" alt="Main NomNoms Logo" className="self-center"/>
            <Title className={classes.title} align="center">
                Change Your Profile Picture
            </Title>
            <Text color="dimmed" size="sm" align="center">
              Want to change your profile picture? Select a preset icon or upload your own photo!
            </Text>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className='bg-rose-200'>
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
              <Group position="apart"  className={classes.controls}>
              {AvatarPicture}
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
    );
  }
