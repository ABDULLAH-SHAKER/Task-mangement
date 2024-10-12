'use client';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './list.css'; 

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const getDaysOfWeek = () => {
    const days = [];
    const firstDay = startDate.getDate() - startDate.getDay(); 
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate.setDate(firstDay + i));
      days.push(day.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }
    return days;
  };

  const daysOfWeek = getDaysOfWeek();

  const groupTasksByDay = () => {
    const grouped = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.date);
      const dayName = taskDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (!grouped[dayName]) {
        grouped[dayName] = [];
      }
      grouped[dayName].push(task);
    });
    return grouped;
  };

  const groupedTasks = groupTasksByDay();

  return (
    <div className="list-container">
      <h2>Weekly Tasks</h2>
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          inline
          dateFormat="MMMM d, yyyy"
        />
        <span>to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          inline
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <div className="days-container">
        {daysOfWeek.map((day) => (
          <div className="day-column" key={day}>
            <h3>{day.split(',')[0]}</h3>
            <ul>
              {groupedTasks[day.split(',')[0]] && groupedTasks[day.split(',')[0]].length > 0 ? (
                groupedTasks[day.split(',')[0]].map((task) => (
                  <li key={task.id}>
                    <strong>{task.text}</strong> - {task.description} <br />
                    <small>Due: {task.date}</small>
                  </li>
                ))
              ) : (
                <li>No tasks</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
