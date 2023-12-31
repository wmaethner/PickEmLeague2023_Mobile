import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';


// import { AuthResult } from '../apis/models/AuthResult';
import { AuthModel } from '../apis';
import { useLogin } from '../hooks/auth/useLogin';
import { RegisterData, useRegister } from '../hooks/auth/useRegister';
import storage from '../utils/storage';
import { useLogging } from './logging';
import { useUser } from './user';

export type AuthContextData = {
  signIn: (username: string, password: string, saveCredentials: boolean) => Promise<boolean>;
  signOut: () => void;
  register: (registerData: RegisterData) => Promise<boolean>;
  loggedIn: boolean;
  // authData: string;
  errorMessage: string;
  username: string;
  password: string;
  saveCredentials: boolean;
}

const AuthContext = createContext<AuthContextData>(null);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(loggedIn: boolean) {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { UserData } = useUser();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "auth";
    const ready = (UserData && loggedIn);

    // This structure may differ from other implementations. 
    if (ready && segments.length === 0) {
      router.push("/(home)/home");
      return;
    } else if (!ready && segments.length === 0) {
      router.push("auth/sign-in");
      return;
    } else if (!ready && !inAuthGroup) {
      router.push("auth/sign-in");
      return;
    } else if (ready && inAuthGroup) {
      router.replace("/(home)/home");
      return;
    }
  }, [loggedIn, segments, navigationState, UserData]);
}

export function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addLog } = useLogging();
  const { setCurrentUser, clearCurrentUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saveCredentials, setSaveCredentials] = useState(false);

  useEffect(() => {
    async function GetCredentials() {
      const username = await SecureStore.getItemAsync('username');
      const password = await SecureStore.getItemAsync('password');
      const saveCredentials = await SecureStore.getItemAsync('saveCredentials');
      setUsername(username ? username : '');
      setPassword(password ? password : '');
      setSaveCredentials(saveCredentials ? true : false);
    }

    GetCredentials();
  }, [])

  const handleLogin = async (username: string, password: string, saveCredentials: boolean = false): Promise<boolean> => {
    useLogin(username, password)
      .then(async result => {
        authCallback(result);
        
        if (result.success && saveCredentials) {
          await SecureStore.setItemAsync('username', username);
          await SecureStore.setItemAsync('password', password);
          await SecureStore.setItemAsync('saveCredentials', 'true');
        }
      });
    return true;
  }

  const handleRegister = async (registerData: RegisterData): Promise<boolean> => {
    useRegister(registerData).then(loginResult => {
      handleAuthResult(loginResult).then(() => {
        setCurrentUser();
        setLoggedIn(true);
      })
    });
    return true;
  }

  const authCallback = (result: AuthModel) => {
    handleAuthResult(result)
      .then(loggedIn => {
        if (loggedIn) {
          setCurrentUser();
          setLoggedIn(true);
        }
      })
  }

  const handleLogout = async () => {
    storage.remove({ key: 'bearerToken' }).then(() => {
      setLoggedIn(false);
      clearCurrentUser();
    });
  }

  const handleAuthResult = async (result: AuthModel): Promise<boolean> => {
    if (result?.success) {
      await storage.save({ key: 'bearerToken', data: result.data.token })
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message);
    }
    return result?.success;
  }

  useProtectedRoute(loggedIn);

  return (
    <AuthContext.Provider
      value={{
        signIn: (username: string, password: string, saveCredentials: boolean = false) => handleLogin(username, password, saveCredentials),
        signOut: handleLogout,
        register: (registerData: RegisterData) => handleRegister(registerData),
        loggedIn,
        errorMessage,
        username,
        password,
        saveCredentials
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
