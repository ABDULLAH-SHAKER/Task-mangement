'use client';
import { useState, useEffect } from 'react'; 
import './page.css';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [filter, setFilter] = useState("all");
  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push('/signup'); 
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      return task.date === today;
    } else if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    }
    return true; 
  });

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-start h-100">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h4>Filter Tasks</h4>
                <button className="btn btn-outline-info btn-block mb-2" onClick={() => setFilter("all")}>
                  All
                </button>
                <button className="btn btn-outline-info btn-block mb-2" onClick={() => setFilter("today")}>
                  Today
                </button>
                <button className="btn btn-outline-info btn-block mb-2" onClick={() => setFilter("completed")}>
                  Done
                </button>
                <button className="btn btn-outline-info btn-block mb-2" onClick={() => setFilter("incomplete")}>
                  To Do
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
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

                  <button type="submit" className="btn btn-info btn-block">
                    Add Task
                  </button>
                  <button onSubmit={handleSubmit} className="btn btn-danger">
                    Logout
                    </button>

                </form>
                
                <ul className="list-group mb-0">
                  {filteredTasks.map((task, index) => (
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
