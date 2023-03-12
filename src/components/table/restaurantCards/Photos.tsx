import { useEffect, useState } from "react"
import { BackgroundImage, Button, Card } from "@mantine/core"
import { IconArrowRight, IconArrowLeft } from "@tabler/icons"
export default function RestImages({photos} : any) {
    const [index, setIndex] = useState(0)

    const [image,setImage] = useState(photos[index])
    const number = photos.length
    useEffect( () => {
        setImage(photos[index])
    },[index])
    function leftClick() {
        if (index == 0) {
            setIndex(number - 1)
        } else {
            setIndex(index-1)
        }
    }
    function rightClick() {
        if (index == number - 1) {
            setIndex(0)
        } else {
            setIndex(index+1)
        }
    }
    return (
        <div style={{ height: '450px',
            width: '450px'}}>
        <Card shadow="sm" 
            radius="lg" 
            style={{ height: '100%', alignItems: 'center', justifyContent: 'center',
            backgroundImage:`url(${image})`,
            opacity : 1,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
           // borderRadius: 'inherit',
           position : 'relative'
             }}>
        {/* <BackgroundImage src = 'https://s3-media2.fl.yelpcdn.com/bphoto/duBKI4mYPF4FGervuNP71w/o.jpg' > */}
            <div style = {{position:'absolute', top : '50%', left : 0}}>
                <Button style = {{color :'white',backgroundColor:'transparent' }} onClick={() => leftClick}><IconArrowLeft size={30} /> </Button>
            </div>
            <div style = {{position:'absolute', top : '50%', right : 0}}>
                <Button style = {{color : 'white',backgroundColor:'transparent' }} onClick={() => rightClick}><IconArrowRight size={30} /> </Button>
            </div>
        {/* </BackgroundImage> */}
        </Card>
        </div>


    )

}