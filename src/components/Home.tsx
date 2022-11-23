import { useEffect, useState } from "react";
import { TodoAPI } from "../models/api/FirebaseAPI";
import { TodoDataService } from "../services/Firebase.API.service";

const todoDataService: TodoDataService = new TodoDataService();

const Home = () => {
  const [data, setData] = useState<TodoAPI[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    todoDataService.initTodoFetch(
      (data) => {
        setData(data);
      },
      () => setIsError(true)
    );
  }, []);

  console.log(data);
  console.log(isError);

  return <div>This is Home</div>;
};

export default Home;
