import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './screens/NotFound/NotFound';
import Main from './screens/Main/Main';
import Families from './screens/Families/Families';
import FamilyDetails from './screens/FamilyDetails/FamilyDetails';
import CharacterDetails from './screens/CharacterDetails/CharacterDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz */}
        <Route path="/" element={<Main />} />

        {/* Ruta para mostrar todas las familias */}
        <Route path="/families" element={<Families />} />

        {/* Ruta para mostrar los detalles de una familia específica */}
        <Route path="/families/:familyName" element={<FamilyDetails />} />

        {/* Ruta para mostrar los detalles de un personaje específico */}
        <Route path="/characters/:characterId" element={<CharacterDetails />} />

        {/* Ruta para mostrar página de error cuando ninguna ruta coincide */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;