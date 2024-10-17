import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import './App.css';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Model from './Pages/Model';  // Import the Model component

function App() {
  return (
    <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<Model />} />
        </Routes>
    </Router>
  );
}

// Create a simple Home component to show on the default route
function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

export default App;
