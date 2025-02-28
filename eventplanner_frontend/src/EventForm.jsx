// EventForm.js
import React, { useState } from 'react';
import './EventForm.css'
import axiosInstance from './axios';

const EventForm = ({onViewEvents}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(title && description && location && address && start_date && start_time){
      let newEvent ={
        title: title,
        description: description,
        location: location,
        address: address,
        start_date: start_date,
        end_date: end_date ? end_date : null,
        start_time: start_time,
        end_time: end_time? end_time : null,
        owner: 1,
      };

      try {
        axiosInstance.post('events/', JSON.stringify(newEvent))
        .then(response => {
          console.log(response);
          resetFormData(e);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    else{
      let str = "The following fields must be filled out: ";
      if(!title){ str+= "\n Event name"; }
      if(!start_date){ str+= "\n Start Date"; }
      if(!start_time){ str+= "\n Start Time"; }
      if(!(address || location)){ str+= "\n Address or Location"; }
      if(!description){ str+= "\n Description"; }

      alert(str);
    }
  };

  const resetFormData = (e) => {
    setTitle("")
    setDescription("")
    setAddress("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");

    onViewEvents(e);
  };

  const handleViewEvents = (e) => {
    onViewEvents(e);
  };

  return (
    <>
      <div className="new-event">
        <form className= "event-form" onSubmit={handleSubmit}>
          <input className="new-event-title" type="text" value={title} placeholder="Event Name" onChange={(e) => setTitle(e.target.value)}/>
          <div className="event-date">
            <input className="event-start-date" type="date" value={start_date}  placeholder="123 Street Road" onChange={(e) => setStartDate(e.target.value)}/>
            {start_date ? (
              <input className="event-end-date" type="date" value={end_date}  placeholder="123 Street Road" onChange={(e) => setEndDate(e.target.value)}/>
            ) : ( <></> )}
          </div>
          <div className="event-time">
            <input type="time" value={start_time}  placeholder="123 Street Road" onChange={(e) => setStartTime(e.target.value)}/>
            {start_time ? (
              <input type="time" value={end_time}  placeholder="123 Street Road" onChange={(e) => setEndTime(e.target.value)}/>
            ) : ( <></> )}
          </div>
          <div className="event-location">
            <input type="text" value={location}  placeholder="The Party Tree" onChange={(e) => setLocation(e.target.value)}/>
            <input type="text" value={address}  placeholder="123 Street Road" onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <textarea rows="5" value={description}  placeholder="Describe your event" onChange={(e) => setDescription(e.target.value)}/>
          <input type="submit" value="Host Event"/>
          <button type="cancel" onClick={handleViewEvents}>Cancel</button>
        </form>
      </div>
    </>
  );
}

export default EventForm;