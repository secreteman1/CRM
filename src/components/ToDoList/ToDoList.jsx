import "./ToDoList.scss";
import ToDoListContent from "../ToDoListContent/ToDoListContent.jsx";

export default function ToDoList({ todos, refresh }) {
  return (
    <div>
      <ul className="no-padding">
        {todos.map((todoItem) => (
          <li className="styled-li" key={todoItem.id}>
            <ToDoListContent todo={todoItem} refresh={refresh} />
          </li>
        ))}
      </ul>
    </div>
  );
}
