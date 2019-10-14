import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag';
import styles from './styles';
import uuid from 'uuid/v1';


const insertTodo = gql`
    mutation ($task: String, $id: uuid) {
        insert_tasks(
            objects: {id: $id, task: $task, userId: 1, completed: false}
        ) 
        { returning {id, task, completed}}
    }
`

const todos = gql`
    query {
        tasks {
            id
            task
            completed 
        }
    }
`;

const AddTodo = () => {
/*class AddTodo extends Component {*/
    const [text, setText] = useState('');
    const handleTextChange = (text) => setText(text);
    const newID = uuid();
    return (
        <View style={{flexDirection:'row', marginHorizontal: 20}}>
            <Mutation 
            mutation={insertTodo} 
            variables={{task: text, id: newID, completed: false}}
            update={(cache, { data: { insert_tasks } } ) => {
                const excistingTasks = cache.readQuery({
                    query: todos
                }).tasks;
                const newTasks = [insert_tasks.returning[0], ...excistingTasks];
                cache.writeQuery({
                    query: todos,
                    data: { tasks: newTasks}
                });
            }}
            optimisticResponse={{
                __typename: 'mutation_root',
                insert_tasks: {
                    __typename: "tasks_mutation_response",
                    returning: [
                        {
                            __typename: "tasks",
                            id: newID,
                            task: text,
                            user_id: 1,
                            completed: false
                        }
                    ]
                }

            }}
            >
                {
                    mutate => {
                        const addTodo = () => {
                            mutate();    
                            setText('');                     
                        }
                        return  (
                            <View style={styles.taskContainer}>
                                <TextInput 
                                    /*onChangeText={(text) => this.setState({text})} */
                                    onChangeText={handleTextChange}
                                    value={text} 
                                    placeholder="Add task desc"
                                    style={styles.taskText}
                                    onSubmitEditing={addTodo}/>
                                <TouchableOpacity onPress={addTodo}>
                                    <View style={{height:50, backgroundColor:'lightgrey', alignItems: 'center', 
                                    justifyContent: 'center', borderColor: 'grey', borderWidth:1, 
                                    borderTopRightRadius: 5, borderBottomRightRadius: 5,}}>
                                        <Text style={{color: 'green', padding: 10, fontSize: 30 }}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                }
            </Mutation>
            
        </View>
    );
}
export default AddTodo;
