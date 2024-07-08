import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const resizeObserverErrDiv = document.createElement('div');
resizeObserverErrDiv.id = 'resize-observer-error';
document.body.appendChild(resizeObserverErrDiv);

const resizeObserverErrDivStyle = document.createElement('style');
resizeObserverErrDivStyle.innerHTML = `
  #resize-observer-error {
    display: none;
  }
`;
document.head.appendChild(resizeObserverErrDivStyle);

const resizeObserverErrEvent = (event) => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    event.stopImmediatePropagation();
  }
};

window.addEventListener('error', resizeObserverErrEvent);

reportWebVitals();
