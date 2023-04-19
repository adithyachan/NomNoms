import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFirebaseAuth } from "../lib/firebase/hooks/useFirebase";

//@ts-ignore
const AuthContext = createContext<{ user: any }>({ user: "loading" });

export const useUser = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<any>({ user: "loading" });
  const auth = useFirebaseAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}