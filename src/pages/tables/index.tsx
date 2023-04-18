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
    if (!user) {
      router.push("/");
    }
    else if (user.user == "loading") {
      return
    }
    else if (!(user?.isAnonymous) && (user?.providerData[0].providerId == "password") && !user?.emailVerified) {
      router.push("/auth/verification")
    }
    else {
      setLoading(false)
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