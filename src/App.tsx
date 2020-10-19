import React from 'react';
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
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
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
