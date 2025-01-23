import { signOut, getAuth } from "firebase/auth";
import firebase_app from "../config";
const auth = getAuth(firebase_app);

export async function signOutUser() {
  let error = null;
  try {
    await signOut(auth);
  } catch (e) {
    error = e;
  }

  return { success: !error, error };
}
