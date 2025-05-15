import {
  facebookProvider,
  firebaseAuth,
  githubProvider,
  googleProvider,
} from "@/utils/firebase-config";
import {
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

export async function handleGithubLogin() {
  signInWithPopup(firebaseAuth, githubProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;

      console.log({ user, token });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);

      console.log({ credential, errorCode, errorMessage, email });
    });
}

export async function handleGoogleLogin() {
  signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;

      console.log({ user, token });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);

      console.log({ credential, errorCode, errorMessage, email });
    });
}

export async function handleFacebookLogin() {
  signInWithPopup(firebaseAuth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      console.log({ user, accessToken });
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
