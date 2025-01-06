import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import Chat from './pages/chat';

function App() {
  const [character, setCharacter] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setCharacter={setCharacter} />} />
        <Route path="/chat" element={<Chat character={character} setCharacter={setCharacter} />} />
      </Routes>
    </Router>
  );
}

export default App;
