import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "../lib/firebase/hooks/useFirebase";


interface UserType {
  email: string | null;
  uid: string | null;
  loading: boolean;
  verified: boolean;
}

const AuthContext = createContext<{ user: UserType }>({user: { email: null, uid: null, loading: true, verified: false }});

export const useUser = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null, loading: true, verified: false });
  const auth = useFirebaseAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          loading: false,
          verified: user.emailVerified
        });
      } else {
        setUser({ email: null, uid: null, loading: false, verified: false });
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