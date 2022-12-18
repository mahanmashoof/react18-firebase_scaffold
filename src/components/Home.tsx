import { useFetchTodos } from "../hooks/api/useAPI";
import { TodoAPI } from "../models/api/FirebaseAPI";
import "./Home.css";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import firebase from "../firebase";
import { useRef, useState } from "react";
import { COLLECTION_NAME } from "../types/enums";

const Home = () => {
  let task = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState("");

  const { data: todos } = useFetchTodos();

  const addNewDoc = async () => {
    await addDoc(collection(firebase, COLLECTION_NAME), {
      todo: task.current?.value,
      created: new Date(),
      status: 0,
    });
    if (task.current?.value != null) {
      task.current.value = "";
    }
  };

  const editDoc = async (id: string, created: Date) => {
    await setDoc(doc(firebase, COLLECTION_NAME, id), {
      todo: task.current?.value,
      created: created,
      status: 0,
    });
    handleEdit("");
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
          {selectedId !== todo.docId && (
            <>
              <p>{todo.todo}</p>
              <button onClick={() => handleEdit(todo.docId)}>edit</button>
            </>
          )}
          {selectedId === todo.docId && (
            <>
              <input id="taskEdit" ref={task} type="text" />
              <button onClick={() => editDoc(todo.docId, todo.created)}>
                OK
              </button>
              <button onClick={() => handleEdit("")}>cancel</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
