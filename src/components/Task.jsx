import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import {
  getTasks,
  sendDeletedTask,
  sendEditedTask,
} from "../features/slices/taskSlice";
import { useState } from "react";
import { useRef } from "react";
import "../styles/tasks.css";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const formRef = useRef();

  const handleDelete = () => {
    dispatch(sendDeletedTask(task._id)).then(() => dispatch(getTasks()));
  };

  const handleChange = (e) => {
    setEditedTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendEditedTask = () => {
    console.log("sending editedTask: " + JSON.stringify(editedTask));
    dispatch(sendEditedTask(editedTask)).then(() => dispatch(getTasks()));
    setConfirmEdit(false);
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      return setEditedTask((prev) => ({ ...prev, completed: true }));
    }
    return setEditedTask((prev) => ({ ...prev, completed: false }));
  };

  return (
    <li className='taskList_item'>
      <div className='taskList_item_actions'>
        <button
          onClick={() => setConfirmEdit(!confirmEdit)}
          className='taskList_item_editBtn'
        >
          <FaEdit size={"1.7rem"} color='#fff' />
        </button>
        <button onClick={handleDelete} className='taskList_item_deleteBtn'>
          <FaTrash size={"1.5rem"} color='#fff' />
        </button>
        <span className='taskList_item_completed'>
          {task.completed ? (
            <MdOutlineCheckBox size={"1.7rem"} color='#d8d7d7' />
          ) : (
            <MdOutlineCheckBoxOutlineBlank size={"1.7rem"} />
          )}
        </span>
      </div>
      <h3 className='taskList_item_title'>{task.name}</h3>
      <p className='taskList_item_desc'>{task.desc}</p>
      <small className='taskList_item_date'>
        {moment(task.createdAt).fromNow()}
      </small>

      {confirmEdit ? (
        <div className='tasks_form_container'>
          <form
            onSubmit={handleSendEditedTask}
            ref={formRef}
            className='tasks_form'
          >
            <button
              onClick={() => {
                formRef.current.reset();
                setConfirmEdit(false);
                setEditedTask(task);
              }}
              type='button'
              className='tasksCreate_btn_close'
            >
              <ImCross size={"1.5rem"} />
            </button>
            <div className='form__group'>
              <input
                type='text'
                name='name'
                id='name'
                defaultValue={task.name}
                onChange={(e) => handleChange(e)}
                className='form__field'
              />
              <label htmlFor='name' className='form__label'>
                Título:{" "}
              </label>
            </div>
            <div className='form__group'>
              <textarea
                name='desc'
                id='desc'
                defaultValue={task.desc}
                onChange={(e) => handleChange(e)}
                className='form__field form__field_textarea'
              ></textarea>
              <label htmlFor='desc' className='form__label'>
                Contenido:{" "}
              </label>
            </div>
            <div className='form_group1'>
              <label htmlFor='completed' className='container'>
                ¿Tarea completada?
                <input
                  type='checkbox'
                  name='completed'
                  id='completed'
                  defaultChecked={task.completed == true ? true : false}
                  onClick={(e) => handleChecked(e)}
                />
                <div class='checkmark'></div>
              </label>
            </div>
            <button type='submit ' className='createTask_btn'>
              Confirmar edición
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default Task;
