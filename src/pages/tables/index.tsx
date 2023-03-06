import TableSelectionLayout from "@/layouts/table/tableSelection/TableSelectionLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { useUser } from "@/providers/AuthProvider";

export default function TablePage() {
  const router = useRouter()
  const auth = useFirebaseAuth()
  const { user } = useUser()

  useEffect(() => {
    if (!user.uid && !user.loading) {
      router.push("/auth/register");
    }
  }, [user, router])

  return (
    <>
      <TableSelectionLayout/>
    </>
  );
}