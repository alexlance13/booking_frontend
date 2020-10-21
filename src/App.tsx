import React from 'react';
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';
import OffersPage from 'pages/OffersPage';
import OrdersPage from 'pages/OrdersPage';
import { USER_ROLES } from 'global-constants';
import CreateEditOfferPage from 'pages/CreateEditOfferPage';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

console.log(process.env.REACT_APP_API_URL);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/auth' component={AuthPage} />
            <Route path='/orders' component={OrdersPage} />
            <Route path='/createOffer' component={CreateEditOfferPage} />
            <PrivateRoute role={USER_ROLES.SELLER} component={OffersPage} path='/offers' />
            {/* <PrivateRoute role='ADMIN' component={Admin} path='/admin' /> */}
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
