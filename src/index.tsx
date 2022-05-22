import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TrashChess from './TrashChess';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <TrashChess />
  //</React.StrictMode>
);
