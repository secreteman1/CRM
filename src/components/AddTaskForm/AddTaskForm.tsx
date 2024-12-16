import { useState } from "react";
import { postToDoTask } from "../../api/todo.js";
import { Button, Form, Input } from "antd";

const AddTaskForm: React.FC<{ refresh: () => void }> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAddButtonClick = async (values: { addInput: string }) => {
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
      <Form form={form} layout="inline" onFinish={handleAddButtonClick}>
        <Form.Item
          name="addInput"
          rules={[
            { min: 2, message: "Минимальное количество символов — 2" },
            { max: 64, message: "Максимальное количество символов — 64" },
          ]}
        >
          <Input
            style={{ width: "265px" }}
            size="large"
            placeholder="Task To Be Done..."
            required
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
