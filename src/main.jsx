import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/Store';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store} >
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>,
)
