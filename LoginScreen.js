import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from './firebaseConfig';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        setError('');
        const normalizedEmail = email.trim();

        if (!normalizedEmail || !password) {
            setError('Enter your email and password.');
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, normalizedEmail, password);
            navigation.reset({
                index: 0,
                routes: [{ name: 'AddTasks' }],
            });
        } catch (err) {
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') {
                setError('Email or password is incorrect.');
            } else if (err.code === 'auth/operation-not-allowed') {
                setError('Email/password sign-in is not enabled in Firebase.');
            } else {
                setError(err.message || 'Unable to sign in.');
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome Back</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error !== '' && <Text style={styles.error}>{error}</Text>}
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : (
                <Button title="Log In" onPress={handleLogin} />
            )}
            <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                Don't have an account? Sign up
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
    heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#D8DEE9', borderRadius: 8, padding: 10,
        marginBottom: 10 },
    error: { color: '#B23A48', marginBottom: 10 },
    link: { color: '#2E5EAA', marginTop: 16, textAlign: 'center' },
});