import { Timestamp } from "firebase/firestore";

export interface Demo {
  demoArray: string[];
  demoMap: {
    demoNumber: number;
    demoBoolean: boolean;
  };
  demoTimestamp: Timestamp;
}
