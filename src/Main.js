import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag';
import styles from './components/styles.js';
import Header from './components/Header';
import uuid from 'uuid/v1';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default function Main() {   
    return (
    <View style={styles.container}>
        <Header/>
        <AddTodo/>
        <TodoList/>
    </View>
  );
}
