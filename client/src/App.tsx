import 'styles/index.scss';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

import Alert from 'constant/alert';
import Pages from 'pages';
import Navbar from 'constant/navbar';
import Loader from 'loader';

export const App = () => (
  <Provider store={store}>
    <Loader/>
    <BrowserRouter>
      <Alert/>
      <Navbar/>
      <Pages/>
    </BrowserRouter>
  </Provider>
)

export default App;