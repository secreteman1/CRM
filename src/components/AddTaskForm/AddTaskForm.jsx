import "./AddTaskForm.sass";
import { useState } from "react";
import postToDoTask from "../../api/postToDoTask.jsx";
import maxMinValidationValues from "../../maxMinValidationValues.jsx";

export default function AddTaskForm({ refresh }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  const handleAddButtonClick = async () => {
    event.preventDefault();
    if (maxMinValidationValues(value, 2, 64)) {
      setIsValid(false);
    } else {
      setLoading(true);
      setError(null);
      setIsValid(true);
      try {
        const data = await postToDoTask(value);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setValue("");
        await refresh();
      }
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
    </>
  );
}
