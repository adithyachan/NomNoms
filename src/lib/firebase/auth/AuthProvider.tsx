import { User } from "@/types/User";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useFirebaseAuth } from "../hooks/useFirebase";


//setting an authentication state observer and getting user data
// when user successfully signs in, get information about the user in the observer


export async function AuthProvider () {
    const auth = useFirebaseAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const checkUser = auth.currentUser;
            console.log("this is the checkUser result: " + checkUser)
            if (checkUser) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("This is the user's id:" +  uid);
            return uid;
            }
            // ...
        } else {
            const checkUser = auth.currentUser;
            // User is signed out
            // ...
            if (!checkUser) {
                console.log("user is signed out")
            }
          }
    });
    
}

/*

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseApp, useFirebaseAuth } from "../hooks/useFirebase";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});


export const UserAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useFirebaseAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
*/