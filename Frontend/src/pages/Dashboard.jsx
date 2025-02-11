import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({ category: '', date: '' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/event/fetchFilteredEvents');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        let url = 'http://localhost:8080/event/fetchFilteredEvents';
        const params = new URLSearchParams();
        if (filter.category) {
          params.append('category', filter.category);
        }
        if (filter.date) {
          params.append('date', filter.date);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching filtered events:', error);
      }
    };

    fetchFilteredEvents();
  }, [filter]);

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleDateChange = (e) => {
    setFilter({ ...filter, date: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">Event Management</div>
        <Link to="/create-event" className="bg-white text-blue-500 px-4 py-2 rounded">Create Event</Link>
      </nav>
      <header className="bg-gray-100 p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Dashboard</h1>
        <div className='flex flex-wrap justify-center gap-4 mb-8 '>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={filter.category}
            onChange={handleCategoryChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All Categories</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Meetup">Meetup</option>
            <option value="Music">Music</option>
            <option value="Lecture">Lecture</option>
            <option value="Symposium">Symposium</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={filter.date}
            onChange={handleDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        </div>
      </header>
      <main className="flex-grow p-8 bg-gray-100">
        <div >
          <h2 className="flex mb-12 text-2xl font-bold mb-4 justify-center">Upcoming Events</h2>
          <ul className='flex flex-wrap justify-center gap-4'>
            {events
              .filter(event => new Date(event.date) >= new Date())
              .map(event => (
                <li key={event._id} className="event-item mb-2 p-4 bg-white rounded shadow">
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p>{event.category}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Past Events</h2>
          <ul c>
            {events
              .filter(event => new Date(event.date) < new Date())
              .map(event => (
                <li key={event._id} className="event-item mb-2 p-4 bg-white rounded shadow">
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p>{event.category}</p>
                </li>
              ))}
          </ul>
        </div>
      </main>
      <footer className="bg-blue-500 p-4 text-white text-center">
        &copy; 2023 Event Management. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;