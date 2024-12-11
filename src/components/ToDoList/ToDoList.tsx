import "./ToDoList.scss";
import ToDoListContent from "../ToDoListContent/ToDoListContent.tsx";

export type Todo = {
  created: Date;
  id: number;
  isDone: boolean;
  title: string;
};

const ToDoList: React.FC<{ todos: Todo[]; refresh: () => void }> = (props) => {
  return (
    <div>
      <ul className="no-padding">
        {props.todos.map((todoItem) => (
          <li className="styled-li" key={todoItem.id}>
            <ToDoListContent todo={todoItem} refresh={props.refresh} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
