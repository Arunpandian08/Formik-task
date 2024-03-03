import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../src/App.css'
import Dashboard from './Components/Dashboard';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import EditForm from './Components/EditForm';

const App = () => {

  const [id, setId] = useState(0)
  
  return (
    <div className='container-fluid d-flex flex-column'>
      <header className="row">
        <div className="col">
          <Navbar />
        </div>
      </header>
      <div className="row flex-grow-1">
        <aside className="col-3 d-flex flex-column">
          <div className="flex-grow-1">
            <Sidebar />
          </div>
        </aside>
        <main className="col-9">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/edituser' element={<EditUser setId={setId} />} />
            <Route path='/editform/:id' element={<EditForm id={id} />} />
            <Route path='/adduser' element={<AddUser />} />
          </Routes>
        </main>
      </div>
    </div>

  );
};

export default App;