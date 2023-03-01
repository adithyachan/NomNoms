/*

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

*/


import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/useFirebase";
import LoadingLayout from "@/layouts/LoadingLayout";


interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const UseAuth = () => useContext<any>(AuthContext);

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
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <LoadingLayout></LoadingLayout> : children}
    </AuthContext.Provider>
  );
}