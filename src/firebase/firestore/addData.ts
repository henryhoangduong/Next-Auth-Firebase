import firebase_app from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function addData(colllection: string, data: object) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllection), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
