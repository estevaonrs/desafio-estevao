// src/App.tsx
import React from 'react';
import ResultadoList from './components/ResultadoList';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'white', display: 'inline-block' }}>Teste Estevão</h1>
      <ResultadoList />
      
    </div>
  );
};

export default App;
