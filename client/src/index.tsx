import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const link = createHttpLink({
  uri: 'http://localhost:5000/',
  credentials: 'include'
});



const client = new ApolloClient({
  cache: new InMemoryCache(),
  link

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
  </ApolloProvider>,
);

