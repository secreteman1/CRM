import { useState } from "react";
import {
  putToDoTaskValue,
  putToDoTaskStatus,
  deleteToDoTask,
} from "../../api/todo.js";
import { Todo } from "../ToDoList/ToDoList.tsx";
import { Button, Checkbox, Input, Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
} from "../../pages/MainPage/MainPage.tsx";

const ToDoListContent: React.FC<{ todo: Todo; refresh: () => void }> = (
  props
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditingNow, setEditingNow] = useState(false);
  const [form] = Form.useForm();

  const handleDeleteClick = async (value: number) => {
    setLoading(true);
    try {
      await deleteToDoTask(value);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      await props.refresh();
    }
  };

  const handleCancelClick = async () => {
    setEditingNow(false);
  };

  const handleChangeCheckbox = async (
    value: number,
    currentStatus: boolean
  ) => {
    setLoading(true);
    try {
      const newStatus = !currentStatus;
      await putToDoTaskStatus(value, newStatus);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setEditingNow(false);
      await props.refresh();
    }
  };

  const handeEditClick = async () => {
    form.setFieldsValue({ editInput: props.todo.title });
    setEditingNow(true);
  };

  const handeSaveClick = async (value: number) => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await putToDoTaskValue(value, values.editInput);
      form.resetFields();
      await props.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setEditingNow(false);
    }
  };

  const editDeleteTemplate = (
    <div className="content-wrapper">
      <Checkbox
        checked={props.todo.isDone}
        onChange={() => handleChangeCheckbox(props.todo.id, props.todo.isDone)}
      ></Checkbox>
      <p className={props.todo.isDone ? "done-p" : "not-done-p "}>
        {props.todo.title}
      </p>
      <Button
        onClick={() => handeEditClick()}
        variant="solid"
        color="primary"
        size="large"
      >
        <EditOutlined />
      </Button>
      <Button
        onClick={() => handleDeleteClick(props.todo.id)}
        disabled={loading}
        variant="solid"
        color="danger"
        size="large"
      >
        <DeleteOutlined />
      </Button>
    </div>
  );

  const saveCancelTemplate = (
    <div className="content-wrapper">
      <Form
        form={form}
        layout="inline"
        style={{
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onFinish={() => handeSaveClick(props.todo.id)}
      >
        <Checkbox
          checked={props.todo.isDone}
          onChange={() =>
            handleChangeCheckbox(props.todo.id, props.todo.isDone)
          }
        ></Checkbox>
        <Form.Item
          name="editInput"
          rules={[
            {
              required: true,
              message: "Неообходимо заполнить данное поле",
            },
            {
              min: MIN_TITLE_LENGTH,
              message: `Минимальное количество символов — ${MIN_TITLE_LENGTH}`,
            },
            {
              max: MAX_TITLE_LENGTH,
              message: `Максимальное количество символов — ${MAX_TITLE_LENGTH}`,
            },
          ]}
          initialValue={props.todo.title}
        >
          <Input style={{ width: "265px" }} type="text"></Input>
        </Form.Item>
        <Button size="large" variant="solid" color="primary" htmlType="submit">
          <SaveOutlined />
        </Button>
        <Button
          size="large"
          variant="solid"
          color="danger"
          onClick={() => handleCancelClick()}
          disabled={loading}
        >
          <CloseOutlined />
        </Button>
      </Form>
    </div>
  );

  return (
    <>
      {isEditingNow ? saveCancelTemplate : editDeleteTemplate}
      {error && (
        <div className="error-container">
          <p className="error-p">{error}</p>
        </div>
      )}
    </>
  );
};

export default ToDoListContent;
