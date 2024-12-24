import AddTaskForm from "./components/AddTaskForm/AddTaskForm.tsx";
import CustomTabs from "./components/CustomTabs/CustomTabs.tsx";
import ToDoList from "./components/ToDoList/ToDoList.tsx";
import { useState, useEffect } from "react";
import { getToDoList } from "./api/todo.ts";
import "./App.css";
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
  const [category, setCategory] = useState<Category>("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantityInformation, setQuantityInformation] =
    useState<QuantityInformation>({
      all: 0,
      completed: 0,
      inWork: 0,
    });

  function handleCategoryButtonClick(name: Category) {
    setCategory(name);
  }

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
    const fetchData = async function () {
      await fetchTodos();
    };
    fetchData();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => clearInterval(interval);
  }, [category]);

  useEffect(() => {
    const fetchData = async function () {
      await fetchTodos();
    };
    fetchData();
  }, []);

  return (
    <Layout
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
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
        handleCategoryButtonClick={handleCategoryButtonClick}
      />
      <ToDoList todos={todos} refresh={fetchTodos}></ToDoList>
    </Layout>
  );
}

export default MainPage;
