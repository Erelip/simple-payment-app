import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Collection } from './views';
import { RequireAuth } from './utils';

const App: React.FC = () => {
  return (
    <div>
      <h1>App Page</h1>
      <Routes>
        <Route path="/protected" element={<ProtectedComponent />} />
      </Routes>
    </div>
  );
};

const ProtectedComponent: React.FC = () => {
  return (
    <div>
      <h2>Protected Page</h2>
    </div>
  );
};
export default App;