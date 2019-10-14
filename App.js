import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main'
import {HttpLink} from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider} from 'react-apollo';

export default function App() {
  
  const link = new HttpLink({
    uri: "https://todolist-graphql.herokuapp.com/v1/graphql"
  })

  const cache = new InMemoryCache();
  const client = new ApolloClient({link, cache});
  
  return (
    <ApolloProvider client={client}>
      <Main/>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
