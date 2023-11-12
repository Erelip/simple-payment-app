import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Collection } from './views';
import { RequireAuth } from './utils';

const App: React.FC = () => {
  console.log('App');
  return (
    <div>
      <h1>App Page</h1>
      {/* Nested route for '/collection/protected' */}
      <Routes>
        <Route path="/protected" element={<ProtectedComponent />} />
      </Routes>
    </div>
  );
};

const ProtectedComponent: React.FC = () => {
  console.log('ProtectedComponent');
  return (
    <div>
      <h2>Protected Page</h2>
    </div>
  );
};
export default App;