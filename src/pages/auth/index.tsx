/* TODO: Make Login Page */
import { useFirebaseApp, useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import AuthenticationLayout from "@/layouts/auth/AuthenticationLayout"

export default function Login() {
  return (
    <>
    < AuthenticationLayout/>
  </>
  );
}

