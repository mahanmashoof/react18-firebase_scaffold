import { useFetchTodos } from "../hooks/api/useAPI";
import { TodoAPI } from "../models/api/FirebaseAPI";
import "./Home.css";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import firebase from "../firebase";
import { useMemo, useRef, useState } from "react";
import { COLLECTION_NAME } from "../types/enums";

const Home = () => {
  let task = useRef<HTMLInputElement>(null);
  let editedTask = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState("");

  const { data: todos } = useFetchTodos();

  const addNewDoc = async () => {
    setSelectedId("");
    await addDoc(collection(firebase, COLLECTION_NAME), {
      todo: task.current?.value,
      created: new Date(),
      status: false,
    });
    if (task.current?.value != null) {
      task.current.value = "";
    }
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
  };

  const editDoc = async (id: string) => {
    handleEdit("");
    const ref = doc(firebase, COLLECTION_NAME, id);
    await updateDoc(ref, {
      todo: editedTask.current?.value,
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(firebase, COLLECTION_NAME, id));
  };

  const todoStatus = (status: boolean) => {
    return status === true ? "taskDone" : "taskDescr";
  };

  const handleChecked = async (id: string, status: boolean) => {
    const ref = doc(firebase, COLLECTION_NAME, id);
    await updateDoc(ref, {
      status: !status,
    });
  };

  const unhandledTasks = todos?.filter((todo) => todo.status === false);

  return (
    <div>
      <input ref={task} type="text" placeholder="enter task" />
      <button onClick={addNewDoc}>create</button>
      <p>{unhandledTasks?.length} tasks pending</p>
      {todos?.map((todo: TodoAPI, i) => (
        <div className="todoDescRow" key={i}>
          {selectedId !== todo.docId ? (
            <>
              <p
                id={todoStatus(todo.status)}
                onClick={() => handleChecked(todo.docId, todo.status)}
              >
                {todo.todo}
              </p>
              <button onClick={() => handleEdit(todo.docId)}>edit</button>
              <button onClick={() => deleteTodo(todo.docId)}>delete</button>
            </>
          ) : (
            <>
              <input
                id="taskEdit"
                ref={editedTask}
                type="text"
                defaultValue={todo.todo}
              />
              <button onClick={() => editDoc(todo.docId)}>OK</button>
              <button onClick={() => handleEdit("")}>cancel</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
