import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag';
import styles from './styles'

const todos = gql`
    query {
        tasks {
            id
            task
            completed 
        }
    }
`;

const TodoList = () => {
    return (
        <Query query={todos}>
            {
                ({data, error, loading}) => {
                    if (error) {
                        console.error(error);
                        return <Text>Error occurred</Text>;
                    }
                    if (loading) {
                        return <Text>Loading</Text>;
                    }
                    if (data) {
                        const toggleTodo = () => {
                            //mutate();                       
                        }
                        return (
                            <ScrollView style={styles.ScrollView}>
                                {
                                    data.tasks.map(todo => {
                                        return (
                                            <TouchableOpacity key={todo.id} onPress={()=>toggleTodo(todo.id)} style={styles.taskItem}>
                                                <Text style={{width: 380, 
                                                    textAlign: 'left', 
                                                    textDecorationLine: todo.completed ? 'line-through':'none'
                                                    }}>{todo.task}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>    
                        )   
                    }
                }
            }
        </Query>
    )
}

export default TodoList;
