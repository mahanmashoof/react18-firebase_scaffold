import { useFetchTodos } from "../hooks/api/useAPI";
import { TodoAPI } from "../models/api/FirebaseAPI";
import "./Home.css";

const Home = () => {
  const { data: todos } = useFetchTodos();
  return (
    <div>
      {todos?.map((todo: TodoAPI, i) => (
        <div className="todoDescRow" key={i}>
          <p>{i + 1}</p>
          <p>{todo.todo}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
