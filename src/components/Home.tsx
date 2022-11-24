import { useEffect, useState } from "react";
import { TodoAPI } from "../models/api/FirebaseAPI";
import { TodoDataService } from "../services/Firebase.API.service";

const todoDataService: TodoDataService = new TodoDataService();

const Home = () => {
  const [data, setData] = useState<TodoAPI[]>();

  useEffect(() => {
    todoDataService.initTodoFetch((data) => {
      setData(data);
    });
  }, []);

  console.log(data);

  return <div>This is Home</div>;
};

export default Home;
