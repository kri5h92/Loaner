import React, {PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import store from '../store';
import ErrorBoundary from './ErrorBoundary';
import routes from '../router/routes';
import createRouter from '../router/createRouter';
import setAuthToken from '../utils/setAuthToken';
import {ACCESS_TOKEN} from '../utils/constants';
import {appSessionStorage} from '../utils/storage/sessionStorage';

const AppRouter = createRouter(routes);
/**
 * Reset default headers for axios api on page refresh 
 */
setAuthToken(appSessionStorage.getItem(ACCESS_TOKEN));

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className='bg-gray-100 min-h-screen'>
          <ErrorBoundary>
            <Router>
              <AppRouter />
            </Router>
          </ErrorBoundary>
        </div>
      </Provider>
    );
  }
}

export default App;
