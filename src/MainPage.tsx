import AddTaskForm from "./components/AddTaskForm/AddTaskForm.tsx";
import CustomTabs from "./components/CustomTabs/CustomTabs.tsx";
import ToDoList from "./components/ToDoList/ToDoList.tsx";
import { useState, useEffect } from "react";
import { getToDoList } from "./api/todo.ts";

import "./App.css";

function MainPage() {
  const [category, setCategory] = useState("all");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantityInformation, setQuantityInformation] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  function handleCategoryButtonClick(name: string) {
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
    fetchTodos();
  }, [category]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="main-content">
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
    </div>
  );
}

export default MainPage;
