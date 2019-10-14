import React, {useEffect, useState} from 'react';
import { StyleSheet, AsyncStorage, View, Text} from 'react-native';
import Main from './src/Main';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { thisExpression } from '@babel/types';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider} from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';

export default function App() {
  
  const [client, setClient] = useState(null);

  useEffect(
    () => {
      const httplink = new HttpLink({
        uri: "https://todolist-graphql.herokuapp.com/v1/graphql"
      })
    
      const retryLink = new RetryLink({ attempts: { max : Infinity } });
      const link = concat(retryLink, httplink);
      const cache = new InMemoryCache();
      
      persistCache({ 
        cache, 
        storage: AsyncStorage
      }).then(() => {
        const client = new ApolloClient({ link, cache });
        setClient(client);
      })
    }, []
  )

  if(!client) {
    return <View style={styles.container}><Text>Loading ...</Text></View>
  }
  
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
