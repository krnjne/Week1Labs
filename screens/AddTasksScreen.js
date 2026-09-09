import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../firebaseConfig';

import TaskCard from '../components/TaskCard';

const fallbackQuotes = [
  'Believe in yourself and get it done!',
  'Small steps every day lead to big results.',
  'Progress is progress, no matter how small.',
  'You are capable of more than you think.',
];

export default function AddTasksScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [quote, setQuote] = useState("Loading today's motivation...");
  const [fallbackQuoteIndex, setFallbackQuoteIndex] = useState(0);

  async function fetchQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');

      if (!response.ok) {
        throw new Error(`Quote request failed: ${response.status}`);
      }

      const data = await response.json();
      setQuote(data.content);
    } catch {
      const nextIndex = (fallbackQuoteIndex + 1) % fallbackQuotes.length;
      setFallbackQuoteIndex(nextIndex);
      setQuote(fallbackQuotes[nextIndex]);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const loadedTasks = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setTasks(loadedTasks);
      setIsLoaded(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchQuote();
  }, []);

  async function handleAddTask() {
    if (taskText.trim() === '') {
      setErrorMessage('Please type a task before adding it.');
      return;
    }

    await addDoc(collection(db, 'tasks'), { title: taskText, done: false });
    setTaskText('');
    setErrorMessage('');
  }

  async function handleToggleTask(id, currentDone) {
    await updateDoc(doc(db, 'tasks', id), { done: !currentDone });
  }

  async function handleDeleteTask(id) {
    await deleteDoc(doc(db, 'tasks', id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a task..."
        value={taskText}
        onChangeText={setTaskText}
      />

      <Button title="Add Task" onPress={handleAddTask} />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Text style={styles.quote}>{quote}</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            done={item.done}
            onToggle={() => handleToggleTask(item.id, item.done)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        contentContainerStyle={tasks.length === 0 ? { flexGrow: 1 } : undefined}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {isLoaded ? 'No tasks yet. Add one above.' : 'Loading tasks...'}
          </Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8DEE9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: '#B23A48',
    marginBottom: 10,
  },
  list: {
    marginTop: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 24,
  },
  separator: {
    height: 8,
  },
  celebration: {
    fontSize: 18,
    color: '#10B981',
    marginTop: 16,
    textAlign: 'center',
  },
  quote: {
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
});