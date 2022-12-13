import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross, ImPlus } from "react-icons/im";
import Task from "../components/Task";
import { createTask, getTasks } from "../features/slices/taskSlice";
import "../styles/tasks.css";

const Tasks = () => {
  const userInfo = useSelector((state) => state.users);
  const taskInfo = useSelector((state) => state.tasks);
  const initialState = { name: "", desc: "", completed: false };
  const dispatch = useDispatch();
  const [task, setTask] = useState(initialState);
  const [createTaskElement, setCreateTaskElement] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name + ": " + e.target.value);
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      return setTask((prev) => ({ ...prev, completed: true }));
    }
    return setTask((prev) => ({ ...prev, completed: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(task)).then(() => dispatch(getTasks()));
    e.target.reset();
    setTask(initialState);
    setCreateTaskElement(false);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return userInfo.isLoggedIn == true ? (
    <section id='tasks'>
      <button onClick={() => setCreateTaskElement(true)} className='tasks_btn'>
        <ImPlus size={"1.5rem"} color='#d8d7d7' />
      </button>
      {createTaskElement && (
        <div className='tasks_form_container'>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className='tasks_form'
            ref={formRef}
          >
            <button
              onClick={(e) => {
                formRef.current.reset();
                setTask(initialState);
                setCreateTaskElement(false);
              }}
              className='tasksCreate_btn_close'
              type='button'
            >
              <ImCross size={"1.5rem"} />
            </button>
            <div className='form__group'>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Titulo'
                onChange={(e) => handleChange(e)}
                required
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
                placeholder='Contenido'
                onChange={(e) => handleChange(e)}
                required
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
                  onClick={(e) => handleChecked(e)}
                />
                <div class='checkmark'></div>
              </label>
            </div>
            <button type='submit' className='createTask_btn'>
              Crear tarea
            </button>
          </form>
        </div>
      )}
      <ul className='taskList'>
        {taskInfo.listOfTasks?.map((task) => {
          return <Task task={task} key={task._id} />;
        })}
      </ul>
    </section>
  ) : (
    "Inicia sesión por favor"
  );
};

export default Tasks;
