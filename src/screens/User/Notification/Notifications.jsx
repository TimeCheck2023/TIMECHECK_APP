import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'
import ListItem from './ListItem';



const TITLES = [
    'Record the dismissible tutorial 🎥',
    'Leave 👍🏼 to the video',
    'Check YouTube comments',
    'Subscribe to the channel 🚀',
    'Leave a ⭐️ on the GitHub Repo',
];

const TASKS = TITLES.map((title, index) => ({ title, index }));



const Notifications = () => {
    const [tasks, setTasks] = useState(TASKS);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <ScrollView style={{ flex: 1 }}>
                {tasks.map((task) => (
                    <ListItem key={task.index} task={task}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFF'
    },
    title: {
        fontSize: 50,
        marginVertical: 20,
        paddingLeft: '5%'
    },
})

export default Notifications
