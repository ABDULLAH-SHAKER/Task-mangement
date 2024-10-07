'use client';
import { useState } from 'react'; 
import './page.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleTaskChange = (e) => setNewTask(e.target.value);
  const handleDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleDateChange = (e) => setTaskDate(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault(); 

    if (newTask.trim() !== "" && taskDate !== "") {
      setTasks([
        ...tasks,
        { text: newTask, description: taskDescription, date: taskDate, completed: false },
      ]);
      setNewTask("");
      setTaskDescription("");
      setTaskDate("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <form className="mb-4" onSubmit={handleFormSubmit}>
                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      id="taskInput"
                      className="form-control"
                      value={newTask}
                      onChange={handleTaskChange}
                      placeholder="New task..."
                    />
                    <label className="form-label" htmlFor="taskInput">
                      Task Name
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      id="descriptionInput"
                      className="form-control"
                      value={taskDescription}
                      onChange={handleDescriptionChange}
                      placeholder="Description..."
                    />
                    <label className="form-label" htmlFor="descriptionInput">
                      Description
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="date"
                      id="dateInput"
                      className="form-control"
                      value={taskDate}
                      onChange={handleDateChange}
                    />
                    <label className="form-label" htmlFor="dateInput">
                      Due Date
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-info btn-block"
                  >
                    Add Task
                  </button>
                </form>
                <ul className="list-group mb-0">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex flex-column align-items-start border-0 mb-2 rounded"
                      style={{ backgroundColor: "#f4f6f7" }}
                    >
                      <div className="d-flex w-100 align-items-center mb-2">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(index)}
                          aria-label="..."
                        />
                        <strong>{task.completed ? <s>{task.text}</s> : task.text}</strong>
                      </div>

                      <small className="text-muted">
                        <span><b>Due:</b> {task.date}</span><br />
                        <span><b>Description:</b> {task.description}</span>
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskManager;
