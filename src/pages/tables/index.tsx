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