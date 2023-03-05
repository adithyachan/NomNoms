import TableSelectionLayout from "@/layouts/table/tableSelection/TableSelectionLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";

export default function TablePage() {
  const router = useRouter()
  const auth = useFirebaseAuth()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
      } else {
        router.push("/auth/login");
      }
    });

    return unsub
  }, [])

  return (
    <>
      <TableSelectionLayout />
    </>
  );
}