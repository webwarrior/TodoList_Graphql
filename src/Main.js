import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Query } from 'react-apollo'; 
import gql from 'graphql-tag';
import styles from './components/styles'

export default function Main() {
    state = {
        text: ''
    }
    
    return (
    <View style={styles.container}>
        <Text>Main App</Text>
        <TextBox/>
        <List/>
    </View>
  );
}

const TextBox = () => {
    const [text, setText] = useState('');
    const handleTextChange = (text) => setText(text);
    return (
        <View style={{flexDirection:'row', marginHorizontal: 20}}>
            <TextInput 
            /*onChangeText={(text) => this.setState({text})} */
            onChangeText={handleTextChange}
            value={text} placeholder="Add task desc"
            style={styles.taskText}>
            </TextInput>
            <TouchableOpacity onPress={()=>this.addTodo(text)}>
                <View style={{height:50, backgroundColor:'lightgrey', alignItems: 'center', 
                justifyContent: 'center'}}>
                    <Text style={{color: 'green', padding: 10, fontSize: 30 }}>+</Text>
                </View>
            </TouchableOpacity>
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

