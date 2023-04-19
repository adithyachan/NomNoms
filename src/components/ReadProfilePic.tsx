import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { Avatar } from "@mantine/core";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

export default function ReadPic() {
    const auth = useFirebaseAuth();
    const user = auth.currentUser;
    auth.currentUser?.photoURL
    let image =null
    const storage = getStorage();
    if (user == undefined) {
        return
    }
    
    const imageRef = ref(storage, `profilePictures/${user.uid}`);
    getDownloadURL(imageRef)
      .then((url) => {
        image = url
      })
      .catch((error) => {
        console.log("Error getting download URL: ", error);
      })
      return image
}