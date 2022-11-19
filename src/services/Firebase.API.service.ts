import firebase from "../firebase";
import {
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
  FirestoreError,
} from "firebase/firestore";
import { Demo } from "../models/api/FirebaseAPI";

const demoDb = query(
  collection(firebase, "demoCollection"),
  orderBy("demoTimestamp")
);

export {};
