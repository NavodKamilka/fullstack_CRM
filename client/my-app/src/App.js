import React from 'react';
import { Routes, Route ,BrowserRouter } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Companies from './Pages/Companies';
import Employees from './Pages/Employees';
//import PrivateRoute from './';

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/allEmployee" element={ <Employees/> } />
            <Route path="/allCompany" element={ <Companies/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path="/" element={ <Login/> } />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
