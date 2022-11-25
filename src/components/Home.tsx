import { useFetchTodos } from "../hooks/api/useAPI";
import { TodoAPI } from "../models/api/FirebaseAPI";

const Home = () => {
  const { data: todos } = useFetchTodos();
  return (
    <div>
      {todos?.map((todo: TodoAPI, i) => (
        <div key={i}>
          <p>{todo.todo}</p>
          <p>{todo.status}</p>
          <p>{todo.docId}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
