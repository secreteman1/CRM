import { useState } from "react";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import deleteToDoTask from "../../api/deleteToDoTask.jsx";
import putToDoTaskStatus from "../../api/putToDoTaskStatus.jsx";
import maxMinValidationValues from "../../maxMinValidationValues.jsx";
import putToDoTaskValue from "../../api/putToDoTaskValue.jsx";

export default function ToDoListContent({ todo, refresh }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isEditingNow, setEditingNow] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleDeleteClick = async (value) => {
    setLoading(true);
    setIsValid(true);
    try {
      const data = await deleteToDoTask(value);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      await refresh();
    }
  };

  const handleCancelClick = async () => {
    if (isEditingNow) {
      setEditId(null);
      setIsValid(true);
    }
  };

  const handleChangeCheckbox = async (value, currentStatus) => {
    setLoading(true);
    try {
      const newStatus = !currentStatus;
      const data = await putToDoTaskStatus(value, newStatus);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      await refresh();
    }
  };

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
  }

  const handeEditClick = async (value) => {
    if (!isEditingNow) {
      setEditId(value);
      setInputValue(todo.title);
      setEditingNow(true);
    }
  };

  const handeSaveClick = async (value) => {
    if (maxMinValidationValues(inputValue, 2, 64)) {
      setIsValid(false);
    } else {
      setLoading(true);
      setIsValid(true);
      try {
        const data = await putToDoTaskValue(value, inputValue);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setEditingNow(false);
        setEditId(null);
        await refresh();
      }
    }
  };

  let editDeleteTemplate = (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => handleChangeCheckbox(todo.id, todo.isDone)}
        ></input>
        <p className={todo.isDone ? "done-p" : null}>{todo.title}</p>
      </div>
      <div className="buttons-div">
        <button className="edit-button" onClick={() => handeEditClick(todo.id)}>
          <img src={editIcon} alt="edit-picture"></img>
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteClick(todo.id)}
          disabled={loading}
        >
          <img src={deleteIcon} alt="delete-picture"></img>
        </button>
      </div>
    </>
  );

  let saveCancelTemplate = (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => handleChangeCheckbox(todo.id, todo.isDone)}
        ></input>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
          className="chanching-input"
        ></input>
      </div>
      <div className="buttons-div">
        <button className="edit-button" onClick={() => handeSaveClick(todo.id)}>
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
        {editId === todo.id ? saveCancelTemplate : editDeleteTemplate}
      </div>
      {!isValid && (
        <div className="error-container">
          <p className="error-p">Количество символов минимум 2 максимум 64</p>
        </div>
      )}
    </>
  );
}
