import "./ToDoList.sass";
import ToDoListContent from "../ToDoListContent/ToDoListContent.jsx";

export default function ToDoList({ todos, refresh }) {
  return (
    <div>
      <ul className="no-padding">
        {todos.map((todo) => (
          <li className="styled-li" key={todo.id}>
            <ToDoListContent todo={todo} refresh={refresh} />
          </li>
        ))}
      </ul>
    </div>
  );
}
