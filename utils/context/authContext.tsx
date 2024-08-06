"use client";

import { auth } from "@/services/database/firebase";
import {
  User as IUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  Auth,
  AuthProvider as authProvider,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = IUser | null | void;
type ContextState = {
  user: User;
  login: (email: string, password: string) => void;
  signInWithGoogle: (auth: Auth, provider: authProvider) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<ContextState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const userCookies = Cookies.get("user");
    return userCookies ? JSON.parse(userCookies) : null;
  });

  const signInWithGoogle = (auth: Auth, provider: authProvider) => {
    signInWithPopup(auth, provider).then((result) => {
      const userData = result.user;
      if (userData.email !== "creattek.team@gmail.com") {
        throw new Error("Email must be provided by creattek");
      } else {
        const userToken = userData.getIdToken;
        Cookies.set("user", JSON.stringify(user), {
          sameSite: "Lax",
        });
        Cookies.set("user_token", JSON.stringify(userToken), {
          sameSite: "strict",
        });
      }
    });
  };

  const login = (email: string, password: string) => {
    // TODO: create add cookie storage

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      const userToken = user.getIdToken;
      Cookies.set("user", JSON.stringify(user), {
        sameSite: "Lax",
      });
      Cookies.set("user_token", JSON.stringify(userToken), {
        sameSite: "strict",
      });
    });
  };

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        const userToken = user.getIdToken;

        Cookies.set("user", JSON.stringify(user), {
          sameSite: "Lax",
        });
        Cookies.set("user_token", JSON.stringify(userToken), {
          sameSite: "strict",
        });
      }
    );
  };

  const logout = () => {
    // TODO: create cookie remove and logout

    auth.signOut();

    Cookies.remove("user");
    Cookies.remove("user_token");
  };

  const value = {
    user,
    login,
    logout,
    signUp,
    signInWithEmailAndPassword,
    signInWithGoogle,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Yo! Parece que não temos uma auth válida!");
  }

  return context;
};
