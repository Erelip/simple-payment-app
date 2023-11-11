import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './views';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" Component={SignUp} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;