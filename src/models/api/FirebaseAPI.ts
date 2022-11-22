import { Timestamp } from "firebase/firestore";

export interface TodoAPI {
  todo: string;
  status: number;
  created: Timestamp;
  docId: string;
}
