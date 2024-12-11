import { useState } from "react";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import maxMinValidationValues from "../../maxMinValidationValues.ts";
import {
  putToDoTaskValue,
  putToDoTaskStatus,
  deleteToDoTask,
} from "../../api/todo.js";
import { Todo } from "../ToDoList/ToDoList.tsx";

const ToDoListContent: React.FC<{ todo: Todo; refresh: () => void }> = (
  props
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isEditingNow, setEditingNow] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleDeleteClick = async (value: number) => {
    setLoading(true);
    setIsValid(true);
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
    setIsValid(true);
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
      await props.refresh();
    }
  };

  function handleInputValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const handeEditClick = async () => {
    setInputValue(props.todo.title);
    setEditingNow(true);
  };

  const handeSaveClick = async (value: number) => {
    if (maxMinValidationValues(inputValue, 2, 64)) {
      setIsValid(false);
      return;
    }
    setLoading(true);
    setIsValid(true);
    try {
      await putToDoTaskValue(value, inputValue);
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

  const editDeleteTemplate = (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          checked={props.todo.isDone}
          onChange={() =>
            handleChangeCheckbox(props.todo.id, props.todo.isDone)
          }
        ></input>
        <p className={props.todo.isDone ? "done-p" : ""}>{props.todo.title}</p>
      </div>
      <div className="buttons-div">
        <button className="edit-button" onClick={() => handeEditClick()}>
          <img src={editIcon} alt="edit-picture"></img>
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteClick(props.todo.id)}
          disabled={loading}
        >
          <img src={deleteIcon} alt="delete-picture"></img>
        </button>
      </div>
    </>
  );

  const saveCancelTemplate = (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          checked={props.todo.isDone}
          onChange={() =>
            handleChangeCheckbox(props.todo.id, props.todo.isDone)
          }
        ></input>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
          className="chanching-input"
        ></input>
      </div>
      <div className="buttons-div">
        <button
          className="edit-button"
          onClick={() => handeSaveClick(props.todo.id)}
        >
          <p className="changed-button">Save</p>
        </button>
        <button
          className="delete-button"
          onClick={() => handleCancelClick()}
          disabled={loading}
        >
          <p className="changed-button">Cancel</p>
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="content-wrapper">
        {isEditingNow ? saveCancelTemplate : editDeleteTemplate}
      </div>
      {!isValid && (
        <div className="error-container">
          <p className="error-p">Количество символов минимум 2 максимум 64</p>
        </div>
      )}
      {error && (
        <div className="error-container">
          <p className="error-p">{error}</p>
        </div>
      )}
    </>
  );
};

export default ToDoListContent;
