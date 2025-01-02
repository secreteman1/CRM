import { useState } from "react";
import { postToDoTask } from "../../api/todo.js";
import { Button, Form, Input } from "antd";
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
} from "../../pages/MainPage/MainPage.tsx";

const AddTaskForm: React.FC<{ refresh: () => void }> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { addInput: string }) => {
    setLoading(true);
    setError(null);
    try {
      await postToDoTask(values.addInput);
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
    }
  };

  return (
    <>
      <Form form={form} layout="inline" onFinish={handleSubmit}>
        <Form.Item
          name="addInput"
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
        >
          <Input
            style={{ width: "265px" }}
            size="large"
            placeholder="Task To Be Done..."
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={loading}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
      {error && <p className="error-p">{error}</p>}
    </>
  );
};

export default AddTaskForm;
