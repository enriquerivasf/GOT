import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './screens/NotFound/NotFound';
import Main from './screens/Main/Main';
import Families from './screens/Families/Families';
import FamilyDetails from './screens/FamilyDetails/FamilyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Families />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/families/:familyName" element={<FamilyDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;