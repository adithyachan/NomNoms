import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
//import firebase from "src/lib/firebase/hooks/useFirebase";
import "firebase/auth";
import { AuthService } from "../pages/auth/authservice";



import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";

const createUserWithEmailAndPassword = async (email, password) => {
    if (email && password) {
        const { error, user } = await AuthService.createUserWithEmailAndPassword(
            email,
            password
        );
        if (error) {
            setError({ [pathname]: error });
            return;
        }
        setUser(user ?? null);
        router.push(`/verify?email=${email}`);
    } else {
        setError({ [pathname]: "Email and password can not be empty" });
    }
};

const signInUserWithEmailAndPassword = async (email, password) => {
    if (email && password) {
        const { error, user } = await AuthService.signInUserWithEmailAndPassword(
            email,
            password
        );
        if (error) {
            setError({ [pathname]: error });
            return;
        }
        setUser(user ?? null);
        router.push("/");
    } else {
        setError({ [pathname]: "Email and password can not be empty" });
    }
};
    

const uiConfig = {
    signInSuccessUrl: "/",

    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
}; 

function SignInScreen() {
    return (
        <div
          style={{
              maxWidth: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
          }}
        >
            <h1>NomNoms Login</h1>
            <p> Please Login</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}
export default SignInScreen;
