import AddTaskForm from "./components/AddTaskForm/AddTaskForm.jsx";
import Tabs from "./components/Tabs/Tabs.jsx"
import ToDoList from "./components/ToDoList/ToDoList.jsx";
import { useState, useEffect } from "react";
import getToDoList from "./api/getToDoList.jsx"
import "./App.css";

function App() {
  const [category, setCategory] = useState("all");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityInformation, setQuantityInformation] = useState({"all": 0, "completed": 0, "inWork": 0});


  function handleCategoryButtonClick(name) {
    setCategory(name);
  }

  const fetchTodos = async () => {
    try {
      const data = await getToDoList(category)
      setTodos(data.data);
      setQuantityInformation(data.info);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(category);
  }, [category]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <main>
        <AddTaskForm refresh={fetchTodos}/>
       <Tabs category={category} quantityInformation={quantityInformation} handleCategoryButtonClick={handleCategoryButtonClick}/>
        <ToDoList
          todos={todos}
          refresh={fetchTodos}
        ></ToDoList>
      </main>
    </div>
  );
}

export default App;
