import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/auth';
import { useLogging } from '../../context/logging';
import { styles } from '../../utils/styles';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const { signIn, errorMessage } = useAuth();
  const { logs, addLog, clearLogs } = useLogging();

  useEffect(() => {
    addLog("sign in use effect");
  }, [])

  const handleClear = () => {
    clearLogs();
  }

  const handleLogin = async () => {
    await addLog(`Attempting login ${username} - ${password}`);
    await signIn(username, password);
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
      {
        errorMessage &&
        <Text>{errorMessage}</Text>
      }
      <Pressable style={styles.button} onPress={handleClear}>
        <Text style={styles.text}>Clear Logs</Text>
      </Pressable>
      <ScrollView>
        {logs.map((log, index) => (
          <Text key={index}>
            {log}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.container}>
        <Text style={{ flex: 2, textAlign: 'center' }}>Username:</Text>
        <TextInput
          style={[styles.input, { flex: 4 }]}
          onChangeText={setUsername}
          value={username}
          autoCapitalize='none'
          autoComplete='username'
        />
      </View>
      <View style={styles.container}>
        <Text style={{ flex: 2, textAlign: 'center' }}>Password:</Text>
        <TextInput
          style={[styles.input, { flex: 4 }]}
          onChangeText={setpassword}
          value={password}
          autoCapitalize='none'
          autoComplete='current-password'
          secureTextEntry={true}
        />
      </View>
      <View style={styles.containerEven}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
        <Link replace href="auth/register" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.text}>Register</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
