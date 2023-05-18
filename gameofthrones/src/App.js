import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './screens/NotFound/NotFound';
import Main from './screens/Main/Main';
import Families from './screens/Families/Families';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Families />} />
        <Route path="/Main" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;