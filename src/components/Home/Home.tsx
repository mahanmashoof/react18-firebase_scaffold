import { useFetchTodos } from "../../hooks/api/useAPI";
import { TodoAPI } from "../../models/api/FirebaseAPI";
import "./Home.css";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import firebase from "../../firebase";
import { useRef, useState } from "react";
import { COLLECTION_NAME } from "../../types/enums";
import CommonButton from "../CommonButton/CommonButton";

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
              <CommonButton
                handleStuff={() => handleEdit(todo.docId)}
                name={"Edit"}
                color={"orange"}
              />
              <CommonButton
                handleStuff={() => deleteTodo(todo.docId)}
                name={"Delete"}
                color={"red"}
              />
            </>
          ) : (
            <>
              <input
                id="taskEdit"
                ref={editedTask}
                type="text"
                defaultValue={todo.todo}
              />
              <CommonButton
                handleStuff={() => editDoc(todo.docId)}
                name={"OK"}
                color={"green"}
              />
              <CommonButton
                handleStuff={() => handleEdit("")}
                name={"Cancel"}
                color={"blue"}
              />
            </>
          )}
        </div>
      ))}
      <p>env = {process.env.NODE_ENV}</p>
    </div>
  );
};

export default Home;
