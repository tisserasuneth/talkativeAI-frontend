import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterCreation from './pages/character-creation';
import Chat from './pages/chat';

function App() {
  const [character, setCharacter] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterCreation setCharacter={setCharacter} />} />
        <Route path="/chat" element={<Chat character={character} />} />
      </Routes>
    </Router>
  );
}

export default App;
