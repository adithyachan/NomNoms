import TableSelectionLayout from "@/layouts/table/tableSelection/TableSelectionLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useUser } from "@/providers/AuthProvider";
import { NotificationsProvider } from "@mantine/notifications";

export default function TablePage() {
  const router = useRouter()
  const auth = useFirebaseAuth()
  const { user } = useUser()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      if (!auth.currentUser.emailVerified && !auth.currentUser.isAnonymous) {
        console.log("Hi")
        router.push("/auth/verification")
      } else {
        setLoading(false)
      }
    } else {
        router.push("/");
    }
  }, [user, router])



  return (
    <>
    {loading ?
      <></>
      :
      <NotificationsProvider>
        <TableSelectionLayout/>
      </NotificationsProvider>
    }

    </>
  );
}