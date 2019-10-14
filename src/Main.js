import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Query, Mutation } from 'react-apollo'; 
import gql from 'graphql-tag';
import styles from './components/styles.js'
import Header from './components/Header'

export default function Main() {   
    return (
    <View style={styles.container}>
        <Header/>
        <TextBox/>
        <List/>
    </View>
  );
}

const insertTodo = gql`
    mutation ($task: String) {
        insert_tasks(
            objects: {task: $task, userId: 1}
        ) 
        { returning {id, task}}
    }
`

const TextBox = () => {
    const [text, setText] = useState('');
    const handleTextChange = (text) => setText(text);
    return (
        <View style={{flexDirection:'row', marginHorizontal: 20}}>
            <Mutation 
            mutation={insertTodo} 
            variables={{task: text}}
            update={(cache, { data: { insert_tasks } } ) => {
                const excistingTasks = cache.readQuery({
                    query: userTasks
                }).tasks;
                const newTasks = [insert_tasks.returning[0], ...excistingTasks];
                cache.writeQuery({
                    query: userTasks,
                    data: { tasks: newTasks}
                });
            }}
            onCompleted={() => setText('')}
            >
                {
                    mutate => {
                        const addTask = () => {
                            mutate();                         
                        }
                        return  (
                            <View style={styles.taskContainer}>
                                <TextInput 
                                    /*onChangeText={(text) => this.setState({text})} */
                                    onChangeText={handleTextChange}
                                    value={text} 
                                    placeholder="Add task desc"
                                    style={styles.taskText}
                                    onSubmitEditing={addTask}/>
                                <TouchableOpacity onPress={addTask}>
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


const userTasks = gql`
    query {
        tasks {
            id
            task
        }
    }
`;


const List = () => {
    return (
        <Query query={userTasks}>
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
                        return (
                        <ScrollView style={styles.ScrollView}>
                                {
                                    data.tasks.map(t => {
                                        return (
                                            <View key={t.id} style={styles.taskItem}>
                                                <Text style={{width: 380, textAlign: 'left'}}>{t.task}</Text>
                                            </View>
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


/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 20,
        padding: 10
    },
    taskItem: {
        marginBottom: 10,
        textAlign: 'left',
        width: 400,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    taskText:  {
        marginBottom: 10,
        borderWidth:1,
        borderColor: 'grey', 
        backgroundColor: 'lightgrey', 
        height: 50, 
        flex: 1, 
        padding: 5,
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5
    },
  });

*/

