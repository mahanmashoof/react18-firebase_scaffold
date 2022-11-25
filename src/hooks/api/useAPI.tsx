import { useEffect, useState } from "react";
import { TodoAPI } from "../../models/api/FirebaseAPI";
import { TodoDataService } from "../../services/Firebase.API.service";

const todoDataService: TodoDataService = new TodoDataService();

export const useFetchTodos = () => {
  const [data, setData] = useState<TodoAPI[]>();

  useEffect(() => {
    todoDataService.initTodoFetch((data) => {
      setData(data);
    });
  }, []);

  return { data };
};
