import ToDoListContent from "../ToDoListContent/ToDoListContent.tsx";
import "./ToDoList.scss";
import { Flex, List } from "antd";

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
          <List.Item>
            <Flex vertical align="center">
              <ToDoListContent todo={todoItem} refresh={props.refresh} />
            </Flex>
          </List.Item>
        )}
      />
    </>
  );
};

export default ToDoList;
