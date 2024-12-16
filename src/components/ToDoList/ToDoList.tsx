import ToDoListContent from "../ToDoListContent/ToDoListContent.tsx";
import "./ToDoList.scss";
import { List } from "antd";

export type Todo = {
  created: Date;
  id: number;
  isDone: boolean;
  title: string;
};

const ToDoList: React.FC<{ todos: Todo[]; refresh: () => void }> = (props) => {
  return (
    <>
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={props.todos}
        renderItem={(todoItem) => (
          <List.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="styled-li">
              <ToDoListContent todo={todoItem} refresh={props.refresh} />
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default ToDoList;
