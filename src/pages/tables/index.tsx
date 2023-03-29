import TableSelectionLayout from "@/layouts/table/tableSelection/TableSelectionLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useUser } from "@/providers/AuthProvider";
import { NotificationsProvider } from "@mantine/notifications";

export default function TablePage() {
  const router = useRouter()
  const auth = useFirebaseAuth()
  const { user } = useUser()
  useEffect(() => {
    if (!user.uid && !user.loading) {
      router.push("/");
    }
  }, [user, router])

  return (
    <>
    {
      <NotificationsProvider>
        <TableSelectionLayout/>
      </NotificationsProvider>
    }

    </>
  );
}