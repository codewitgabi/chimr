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
      authService.loginViaSocialAuth(result, callback, {
        domain: "github",
      });
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
      authService.loginViaSocialAuth(result, callback, {
        domain: "google",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    });
}

export async function handleFacebookLogin(callback?: TOauthSuccessCallback) {
  signInWithPopup(firebaseAuth, facebookProvider)
    .then(async (result) => {
      authService.loginViaSocialAuth(result, callback, {
        domain: "facebook",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log({ errorCode, errorMessage, email, credential });
    });
}
