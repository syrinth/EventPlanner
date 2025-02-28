// App.js
import './App.css'

import React, { useState, useEffect } from 'react';
import EventForm from './EventForm'
import Header from './components/header';
import MySidebar from './components/sidebar';

import axiosInstance from './axios';


function App() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() =>{
    fetchData()
  }, [])

  const fetchData = () => {
    axiosInstance.get('events/')
    .then(response => {
      const data = response.data;
      setEvents(data);
    })
    .catch(err => console.log(err))
  }

  const handleNewEventClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleViewEvents = (e) => {
    e.preventDefault();
    fetchData();
    setShowForm(false);
  };

  return (
    <>
      <div>
        <Header/>
      </div>
      <div className="body">
        <div className="sidebar">
          <MySidebar onNewEvent={handleNewEventClick} onShowAllEvents={handleViewEvents}/>
        </div>
        <div className="main">
          {!showForm ? (       
            <div>
              {events.length ? (
                <div className="event-list">
                {events.map(item => (
                  <div key={item.id}>
                    {/* ToDo: Split events into This week and Later */}
                    <div className="event-card">
                      <div className="event-title">{item.title}</div>
                      <div className="event-description">{item.description}</div>
                    </div>
                  </div>
                ))}
                </div>
              ) : (
                <>
                </>
            )}
            </div>
          ) : (
            <EventForm onViewEvents={handleViewEvents}/>
          )}
        </div>
      </div>
    </>
  );
}

export default App;