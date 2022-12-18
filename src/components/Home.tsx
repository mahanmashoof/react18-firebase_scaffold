import { useFetchTodos } from "../hooks/api/useAPI";
import { TodoAPI } from "../models/api/FirebaseAPI";
import "./Home.css";
import { collection, addDoc } from "firebase/firestore";
import firebase from "../firebase";
import { useRef, useState } from "react";

const Home = () => {
  let task = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState("");

  const { data: todos } = useFetchTodos();
  const addNewDoc = async () => {
    await addDoc(collection(firebase, "todos"), {
      todo: task.current?.value,
      created: new Date(),
      status: 0,
    });
    if (task.current?.value != null) {
      task.current.value = "";
    }
  };

  const handleEdit = (x: string) => {
    setSelectedId(x);
  };

  return (
    <div>
      <input ref={task} type="text" placeholder="enter task" />
      <button onClick={addNewDoc}>create</button>
      {todos?.map((todo: TodoAPI, i) => (
        <div className="todoDescRow" key={i}>
          <p>{i + 1}</p>
          <p id="taskDesc">{todo.todo}</p>
          {selectedId === todo.docId && <input id="taskEdit" />}
          <button onClick={() => handleEdit(todo.docId)}>edit</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
