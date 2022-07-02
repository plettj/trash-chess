import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TSChessEngine from './TSChessEngine';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <TSChessEngine />
  //</React.StrictMode>
);
