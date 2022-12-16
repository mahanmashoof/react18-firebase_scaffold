import { useFetchTodos } from "../hooks/api/useAPI";
import { TodoAPI } from "../models/api/FirebaseAPI";
import "./Home.css";
import { collection, addDoc } from "firebase/firestore";
import firebase from "../firebase";
import { useRef } from "react";

const Home = () => {
  const { data: todos } = useFetchTodos();
  let task = useRef<HTMLInputElement>(null);
  const addNewDoc = async () => {
    await addDoc(collection(firebase, "todos"), {
      todo: task.current?.value,
      created: new Date(),
      status: 0,
    });
  };

  return (
    <div>
      {todos?.map((todo: TodoAPI, i) => (
        <div className="todoDescRow" key={i}>
          <p>{i + 1}</p>
          <p>{todo.todo}</p>
        </div>
      ))}
      <input ref={task} type="text" placeholder="enter task" />
      <button onClick={addNewDoc}>create</button>
    </div>
  );
};

export default Home;
