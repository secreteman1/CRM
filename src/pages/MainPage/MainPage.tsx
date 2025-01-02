import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.tsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.tsx";
import ToDoList from "../../components/ToDoList/ToDoList.tsx";
import { useState, useEffect } from "react";
import { getToDoList } from "../../api/todo.ts";
import { Layout } from "antd";

type Category = "all" | "inWork" | "done";

type Todo = {
  created: Date;
  id: number;
  isDone: boolean;
  title: string;
};

type QuantityInformation = {
  all: number;
  completed: number;
  inWork: number;
};

export const MIN_TITLE_LENGTH = 2;
export const MAX_TITLE_LENGTH = 64;

function MainPage() {
  const [category, setFilter] = useState<Category>("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantityInformation, setQuantityInformation] =
    useState<QuantityInformation>({
      all: 0,
      completed: 0,
      inWork: 0,
    });

  const changeFilter = (filter: Category) => {
    setFilter(filter);
  };

  const fetchTodos = async () => {
    try {
      const data = await getToDoList(category);
      setTodos(data.data);
      setQuantityInformation(data.info);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => clearInterval(interval);
  }, [category]);

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, []);

  return (
    <Layout
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      {loading && "Loading..."}
      {error && (
        <div className="error-container">
          <p className="error-p">{error}</p>
        </div>
      )}
      <AddTaskForm refresh={fetchTodos} />
      <CustomTabs
        category={category}
        quantityInformation={quantityInformation}
        changeFilter={changeFilter}
      />
      <ToDoList todos={todos} refresh={fetchTodos}></ToDoList>
    </Layout>
  );
}

export default MainPage;
