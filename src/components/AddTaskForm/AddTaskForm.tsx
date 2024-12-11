import "./AddTaskForm.scss";
import { useState } from "react";
import { postToDoTask } from "../../api/todo.js";
import maxMinValidationValues from "../../maxMinValidationValues.js";

const AddTaskForm: React.FC<{ refresh: () => void }> = (props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const handleAddButtonClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (maxMinValidationValues(value, 2, 64)) {
      setIsValid(false);
      return;
    }
    setLoading(true);
    setError(null);
    setIsValid(true);
    try {
      await postToDoTask(value);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setValue("");
      await props.refresh();
    }
  };

  return (
    <>
      <form className="input-button-group" onSubmit={handleAddButtonClick}>
        <input
          value={value}
          onChange={handleInputChange}
          required
          placeholder="Task To Be Done..."
          className="input-header"
        />
        <button type="submit" disabled={loading} className="default-button">
          Add
        </button>
      </form>
      {!isValid && (
        <p className="error-p">Количество символов минимум 2 максимум 64</p>
      )}
      {error && <p className="error-p">{error}</p>}
    </>
  );
};

export default AddTaskForm;
