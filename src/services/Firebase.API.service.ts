import firebase from "../firebase";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { TodoAPI } from "../models/api/FirebaseAPI";

const todoDb = query(collection(firebase, "todos"), orderBy("created"));

export class TodoDataService {
  initTodoFetch = (callBack: (todos: TodoAPI[]) => void): void => {
    onSnapshot(todoDb, (querySnapshot) => {
      const todos: TodoAPI[] = [];
      querySnapshot.forEach((doc) => {
        const rawData = doc.data();

        const todo: TodoAPI = {
          docId: doc.id,
          status: rawData.status ?? false,
          todo: rawData.todo ?? "---Wasn't fetched from db---",
          created: rawData.created,
        };

        todos.push(todo);
      });
      callBack(todos);
    });
  };
}
