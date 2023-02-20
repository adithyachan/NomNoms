import { useFirebaseAuth } from "@/lib/firebase/hooks/useFirebase"
import {signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { StringLiteral } from "typescript";

export async function CreateAccountEmailandPassword(email:string, password:string) {
	const auth = useFirebaseAuth();
	createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
	console.log("User was sucessfully created")
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	console.log("Account creation was unsuccessful")
    // ..
  });
}

export async function SignUpWithGoogle() {
	const provider = new GoogleAuthProvider();
	const auth = useFirebaseAuth();
	signInWithPopup(auth, provider)
	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;
		// The signed-in user info.
		const user = result.user;
		// IdP data available using getAdditionalUserInfo(result)
		// ...
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		// ...
	});
}







	/*
	loginWithGoogle: async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			const userCred = await firebase.auth().signInWithPopup(provider);
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	logout: async () => {
		await firebase.auth().signOut();
	},

	createUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await userCred.user.sendEmailVerification({
				url: "http://localhost:3000",
			});
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	signInUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	resetPassword: async (email) => {
		try {
			await firebase
				.auth()
				.sendPasswordResetEmail(email, { url: "http://localhost:3000/login" });
		} catch (e) {
			return e.message;
		}
	},

	deleteAccount: async () => {
		try {
			await firebase.auth().currentUser.delete();
		} catch (e) {
			return e.message;
		}
	},
	updatePassword: async (newPassword) => {
		try {
			await firebase.auth().currentUser.updatePassword(newPassword);
			return "Update successfully";
		} catch (e) {
			return e.message;
		}
	},
};*/