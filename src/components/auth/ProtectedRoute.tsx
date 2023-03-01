import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UseAuth } from "@/lib/firebase/auth/AuthProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = UseAuth();
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
      setValid(true)
    }
  }, [router, user]);

  return <div>{valid ? children : null}</div>;
};
export default ProtectedRoute;
