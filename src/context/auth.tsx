import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { AuthResult } from '../apis/models/AuthResult';
import { useLogin } from '../hooks/auth/useLogin';
import { RegisterData, useRegister } from '../hooks/auth/useRegister';
import storage from '../utils/storage';
import { useLogging } from './logging';
import { useUser } from './user';

export type AuthContextData = {
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  register: (registerData: RegisterData) => Promise<boolean>;
  loggedIn: boolean;
  // authData: string;
  errorMessage: string;
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
    console.log(`Ready ${ready}`);

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
  // const [authData, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addLog } = useLogging();
  const { setCurrentUser, clearCurrentUser } = useUser();

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    useLogin(username, password).then(loginResult => {
      handleAuthResult(loginResult).then(() => {
        setCurrentUser();
        setLoggedIn(true);
      })
    });
    return true;

    // await addLog(`Auth provider handle login ${username} - ${password}`);
    // console.log("logging in");
    // const result = await useLogin(username, password);
    // await addLog(`Auth provider handle login result ${result.success}`);
    // console.log(`Use login result ${result.success}`);
    // handleAuthResult(result).then()
    // await setCurrentUser();
    // await setLoggedIn(true);
    // return true;
  }

  const handleLogout = async () => {
    storage.remove({ key: 'bearerToken' }).then(() => {
      setLoggedIn(false);
      clearCurrentUser();
    });
  }

  const handleRegister = async (registerData: RegisterData): Promise<boolean> => {
    const result = await useRegister(registerData);
    return await handleAuthResult(result);
  }

  const handleAuthResult = async (result: AuthResult): Promise<boolean> => {
    if (result?.success) {
      // setAuth(result.data.token);
      console.log(`setting token ${result.data.token}`);
      await storage.save({ key: 'bearerToken', data: result.data.token })
      setErrorMessage(null);
    } else {
      // setAuth(null);loggedIn
      setErrorMessage(result.message);
    }
    return result?.success;
  }

  useProtectedRoute(loggedIn);

  return (
    <AuthContext.Provider
      value={{
        signIn: (username: string, password: string) => handleLogin(username, password),
        signOut: handleLogout,
        register: (registerData: RegisterData) => handleRegister(registerData),
        loggedIn,
        errorMessage
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
