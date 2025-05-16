import authService from "@/services/auth.service";
import { TOauthSuccessCallback } from "@/types/auth.types";
import {
  facebookProvider,
  firebaseAuth,
  githubProvider,
  googleProvider,
} from "@/utils/firebase-config";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";

export async function handleGithubLogin(callback?: TOauthSuccessCallback) {
  signInWithPopup(firebaseAuth, githubProvider)
    .then(async (result) => {
      authService.loginViaSocialAuth(result, callback);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    });
}

export async function handleGoogleLogin(callback?: TOauthSuccessCallback) {
  signInWithPopup(firebaseAuth, googleProvider)
    .then(async (result) => {
      authService.loginViaSocialAuth(result, callback);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    });
}

export async function handleFacebookLogin() {
  signInWithPopup(firebaseAuth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.idToken;

      console.log({ user, token });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log({ errorCode, errorMessage, email, credential });
    });
}
