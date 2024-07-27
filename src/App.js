// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Card from './pages/Card';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/messages" element={<Card />} />   
      </Routes>
    </Router>
  );
};

export default App;
