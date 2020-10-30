import React from 'react';
import './App.css';
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PrivateRoute from 'components/PrivateRoute';
import OffersPage from 'pages/OffersPage';
import OrdersPage from 'pages/OrdersPage';
import { USER_ROLES } from 'global-constants';
import EditOfferPage from 'pages/EditOfferPage';
import CreateOfferPage from 'pages/CreateOfferPage';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SingleVoucherPage from 'pages/SingleVoucherPage';
import SingleApartmentPage from 'pages/SingleApartmentPage';
import AdminPage from 'pages/AdminPage';

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
            <Route path='/editOffer' component={EditOfferPage} />
            <Route path='/voucher/:id' component={SingleVoucherPage} />
            <Route path='/apartment/:id' component={SingleApartmentPage} />
            <PrivateRoute role={USER_ROLES.SELLER} component={CreateOfferPage} path='/createOffer' />
            <PrivateRoute role={USER_ROLES.SELLER} component={OffersPage} path='/offers' />
            <PrivateRoute role={USER_ROLES.ADMIN} component={AdminPage} path='/admin' />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
