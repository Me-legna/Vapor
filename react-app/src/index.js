import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { Modal, ModalProvider } from './components/context/Modal';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <Modal />
        </Provider>
      </BrowserRouter>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
