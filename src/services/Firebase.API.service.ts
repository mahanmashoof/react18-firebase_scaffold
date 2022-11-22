import firebase from "../firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  FirestoreError,
} from "firebase/firestore";
import { TodoAPI } from "../models/api/FirebaseAPI";

const todoDb = query(collection(firebase, "todos"), orderBy("created"));

export class TodoDataService {
  initTodoFetch = (
    callBack: (todos: TodoAPI[]) => void,
    callBackError: (error: FirestoreError) => void
  ): void => {
    onSnapshot(
      todoDb,
      (querySnapshot) => {
        const todos: TodoAPI[] = [];
        querySnapshot.forEach((doc) => {
          const rawData = doc.data();

          const todo: TodoAPI = {
            docId: doc.id,
            created: rawData.created ?? new Date(0),
            status: rawData.status ?? 0,
            todo: rawData.todo ?? "-",
          };

          todos.push(todo);
        });
        callBack(todos);
      },
      (error) => {
        callBackError(error);
      }
    );
  };
}
